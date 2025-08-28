from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import RegisterSerializer, UserOutSerializer
from rest_framework.permissions import IsAuthenticated
from .serializers import ChangePasswordSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
# from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import stripe
# import json
from .models import Profile
from .serializers import ProfileSerializer

stripe.api_key = settings.STRIPE_SECRET_KEY

# @csrf_exempt
class CreateGrowthSubscriptionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        price_id = request.data.get("priceId")

        if not price_id:
            return Response({"error": "Missing priceId"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            profile,created = Profile.objects.get_or_create(user=user)
            
            # 1. Create Stripe customer if not already saved
            if not profile.stripe_customer_id:
                customer = stripe.Customer.create(email=user.email)
                profile.stripe_customer_id = customer.id
                profile.save()

            # 2. Create Checkout Session for subscription
            checkout_session = stripe.checkout.Session.create(
                customer=profile.stripe_customer_id,
                payment_method_types=["card"],
                line_items=[{"price": price_id, "quantity": 1}],
                mode="subscription",
                success_url="http://localhost:3000/success",
                cancel_url="http://localhost:3000/cancel",
            )

            # 3. Mark subscription as pending until webhook confirms
            profile.subscription_status = "pending"
            profile.save()

            return Response({"url": checkout_session.url}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class SubscriptionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Ensure profile exists
        profile, created = Profile.objects.get_or_create(user=request.user)

        # Serialize the base profile data
        serializer = ProfileSerializer(profile)
        data = serializer.data

        # Default no active plan
        active_plan = None

        # If Stripe customer exists, check subscriptions
        if profile.stripe_customer_id:
            try:
                subs = stripe.Subscription.list(
                    customer=profile.stripe_customer_id,
                    status="active",
                    limit=1
                )
                if subs.data:
                    # Get the active subscription's priceId
                    active_plan = subs.data[0]["items"]["data"][0]["price"]["id"]
            except Exception as e:
                # Optional: log the error
                print("Stripe error:", e)

        # Add active_plan to the response
        data["active_plan"] = active_plan

        return Response(data)

class RegisterView(APIView):
    authentication_classes = []  # open endpoint for sign up
    permission_classes = []

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(UserOutSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        profile, created = Profile.objects.get_or_create(user=user)

        # Check active subscription
        active_plan = None
        if profile.stripe_customer_id:
            try:
                subs = stripe.Subscription.list(
                    customer=profile.stripe_customer_id,
                    status="active",
                    limit=1
                )
                if subs.data:
                    active_plan = subs.data[0]["items"]["data"][0]["price"]["id"]
            except Exception as e:
                print("Stripe error:", e)

        return Response({
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "avatar": request.build_absolute_uri(profile.avatar.url) if profile.avatar else None,
            "stripe_customer_id": profile.stripe_customer_id,
            "subscription_id": profile.subscription_id,
            "subscription_status": profile.subscription_status,
            "active_plan": active_plan,
        })

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response({"ok": True, "msg": "You are authenticated!"})
    
class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = request.user
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response({"detail": "Password changed successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DeleteAccountView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request):
        user = request.user
        user.delete()
        return Response({"detail": "Account deleted successfully"}, status=status.HTTP_200_OK)
    
class AvatarUploadView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        profile = request.user.profile  # ✅ get related Profile
        file = request.FILES.get('avatar')
        if file:
            profile.avatar = file
            profile.save()
            return Response({"message": "Avatar uploaded"})
        return Response({"error": "No file provided"}, status=400)
    
class ChangeNameView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        user = request.user
        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")

        if first_name:
            user.first_name = first_name
        if last_name:
            user.last_name = last_name

        user.save()
        return Response({"first_name": user.first_name, "last_name": user.last_name})