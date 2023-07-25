from rest_framework import serializers
from ...models import UserProfile, Post, Comment, Like, Save, Follow, Notification, Tag, Ingredient, Recipe, Instruction, Image, Video

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['firebase_uid', 'username', 'email']