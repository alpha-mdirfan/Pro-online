from .views import RegisterView, MeView, ProtectedView,ChangePasswordView,DeleteAccountView, AvatarUploadView,CreateGrowthSubscriptionView, SubscriptionView ,ChangeNameView,UpdateProfileView, CourseView, CourseDetailView
from django.urls import path

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path("me/", MeView.as_view(), name="me"),                 
    path("protected/", ProtectedView.as_view(), name="prot"), # sample protected
    path("change-password/", ChangePasswordView.as_view(), name="change-password"),
    path("delete-account/", DeleteAccountView.as_view(), name="delete-account"),
    path("upload-avatar/", AvatarUploadView.as_view(), name="upload-avatar"),
    path("create-growth-subscription/", CreateGrowthSubscriptionView.as_view(), name="create-growth-subscription"),
    path("profile/", SubscriptionView.as_view(), name="user-profile"),
    path("change-name/", ChangeNameView.as_view(), name="change-name"),
    path("update-profile/", UpdateProfileView.as_view(), name="update-profile"),
    path("course/", CourseView.as_view(), name="course"),
    path("course/<int:pk>/", CourseDetailView.as_view(), name="course-detail"),
]


