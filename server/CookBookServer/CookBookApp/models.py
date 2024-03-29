from django.db import models
import uuid

class UserProfile(models.Model):
    """
    UserProfile Model
    Relations:
    - Has many Posts (related_name='posts')
    - Has many Comments (related_name='comments')
    - Has many Likes (related_name='likes')
    - Has many Saves (related_name='saves')
    - Has many Follows (related_name='follows')
    """
    firebase_uid = models.CharField(max_length=255, primary_key=True)
    username = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
        
class Post(models.Model):
    """
    Post Model
    Relations:
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    content = models.TextField()
    userId = models.ForeignKey('UserProfile', related_name='posts', on_delete=models.CASCADE)
    tags = models.ManyToManyField('Tag', related_name='posts', blank=True)
    media_file = models.FileField(upload_to='', null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    # comments is already a many - to many relation

class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    content = models.TextField()
    userId = models.ForeignKey('UserProfile', related_name='comments', on_delete=models.CASCADE)
    post = models.ForeignKey('Post', related_name='comments', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
class Like(models.Model):
    user = models.ForeignKey('UserProfile', related_name='likes', on_delete=models.CASCADE)
    post = models.ForeignKey('Post', related_name='likes', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Save(models.Model):
    user = models.ForeignKey('UserProfile', related_name='saved_posts', on_delete=models.CASCADE)
    post = models.ForeignKey('Post', related_name='saved_posts', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Receipt(models.Model):
    store = models.CharField(max_length=255)
    userId = models.ForeignKey('UserProfile', related_name='receipts', on_delete=models.CASCADE, null=True, blank=True)  # Allowing null for userId as per your structure
    foods = models.JSONField(null=True, blank=True)  # Making JSONField nullable and optionally blank in forms

class Product(models.Model):
    receipt = models.ForeignKey(Receipt, related_name='products', on_delete=models.CASCADE)
    product = models.CharField(max_length=255)
    brand = models.CharField(max_length=255, null=True, blank=True)  # Allowing null for brand as per your structure
    price = models.CharField(max_length=255)  
        
class Follow(models.Model):
    follower = models.ForeignKey('UserProfile', related_name='followings', on_delete=models.CASCADE)
    followed = models.ForeignKey('UserProfile', related_name='followers', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
class Notification(models.Model):
    NOTIFICATION_TYPES = ((1, 'Like'), (2, 'Comment'), (3, 'Follow'), (4, 'Save'))
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('UserProfile', related_name='notifications', on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    notification_type = models.IntegerField(choices=NOTIFICATION_TYPES)
    # related fields
    post = models.ForeignKey('Post', related_name='notifications', on_delete=models.CASCADE, null=True, blank=True)
    comment = models.ForeignKey('Comment', related_name='notifications', on_delete=models.CASCADE, null=True, blank=True)
    like = models.ForeignKey('Like', related_name='notifications', on_delete=models.CASCADE, null=True, blank=True)
    save = models.ForeignKey('Save', related_name='notifications', on_delete=models.CASCADE, null=True, blank=True)
    follow = models.ForeignKey('Follow', related_name='notifications', on_delete=models.CASCADE, null=True, blank=True)

class Tag(models.Model):
    name = models.CharField(max_length=200)
    post = models.ForeignKey('Post', related_name='post_tags', on_delete=models.CASCADE)


class Image(models.Model):
    post = models.ForeignKey('Post', related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='posts/')  # Assuming you're using Django's file handling

class Video(models.Model):
    post = models.ForeignKey('Post', related_name='videos', on_delete=models.CASCADE)
    video = models.FileField(upload_to='posts/')  # Assuming you're using Django's file handling

    
# Add grouping of ingredients here later
