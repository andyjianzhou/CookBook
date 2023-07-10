from django.db import models
import uuid

class UserProfile(models.Model):
    firebase_uid = models.CharField(max_length=255, primary_key=True)
    username = models.CharField(max_length=255)
    email = models.CharField(max_length=255)

class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey('UserProfile', related_name='posts', on_delete=models.CASCADE)

class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    content = models.TextField()
    author = models.ForeignKey('UserProfile', related_name='comments', on_delete=models.CASCADE)
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

class Follow(models.Model):
    follower = models.ForeignKey('UserProfile', related_name='followings', on_delete=models.CASCADE)
    followed = models.ForeignKey('UserProfile', related_name='followers', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


