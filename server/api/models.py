from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True) 
    
    # 👉 Subscription fields
    stripe_customer_id = models.CharField(max_length=255, blank=True, null=True)
    subscription_id = models.CharField(max_length=255, blank=True, null=True)
    subscription_status = models.CharField(max_length=50, default="inactive")
    
    # New fields
    company_name = models.CharField(max_length=255, blank=True, null=True)
    about_company = models.TextField(blank=True, null=True)
    
    
    def __str__(self):
        return f"{self.user.username}"
    
class Course(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="courses")
    title = models.CharField(max_length=255)
    info = models.TextField(blank=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="course_images/", null=True, blank=True) 
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.user.username})"
