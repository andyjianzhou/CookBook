from rest_framework import serializers
from ...models import UserProfile
from ...services.Users.UserService import UserProfileService

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['firebase_uid', 'username', 'email']
        
    def create(self, validated_data):
        user_profile = UserProfileService.create_user_profile(
            firebase_uid=validated_data.get('firebase_uid'), # Assuming that firebase_uid is provided.
            username = validated_data.get('username'),
            email=validated_data.get('email'),
        )
        return user_profile
    
    def update(self, instance, validated_data):
        user_profile = UserProfileService.update_user_profile(
            firebase_uid=instance.firebase_uid, 
            username=validated_data.get('username', None),
            email=validated_data.get('email', None)
        )
        if not user_profile:
            raise serializers.ValidationError("User Profile with given firebase_uid does not exist.")
        
        return user_profile