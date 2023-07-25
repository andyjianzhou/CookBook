from ...models import UserProfile, Post, Like, Save, Follow, Tag, Comment, Notification, RecipeIngredient
from django.core.exceptions import ObjectDoesNotExist

class UserProfileService:
    @staticmethod
    def create_user_profile(firebase_uid, username, email):
        user_profile = UserProfile(firebase_uid=firebase_uid, username=username, email=email)
        user_profile.save()
        return user_profile

    @staticmethod
    def get_user_profile_by_uid(firebase_uid):
        try:
            return UserProfile.objects.get(firebase_uid=firebase_uid)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def update_user_profile(firebase_uid, username=None, email=None):
        try:
            user_profile = UserProfile.objects.get(firebase_uid=firebase_uid)
            if username is not None:
                user_profile.username = username
            if email is not None:
                user_profile.email = email
            user_profile.save()
            return user_profile
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def delete_user_profile(firebase_uid):
        try:
            user_profile = UserProfile.objects.get(firebase_uid=firebase_uid)
            user_profile.delete()
        except ObjectDoesNotExist:
            return None
