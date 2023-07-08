from django.db import models
import uuid

class UserProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    firebase_uid = models.CharField(max_length=255, primary_key=True)
    username = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    # Add additional user profile fields here

class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey('UserProfile', related_name='posts', on_delete=models.CASCADE)
    likes = models.ManyToManyField('UserProfile', related_name='liked_posts')
    shared = models.ManyToManyField('UserProfile', related_name='shared_posts')
    saved = models.ManyToManyField('UserProfile', related_name='saved_posts')

