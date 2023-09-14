from rest_framework import serializers
from ...models import Post, Comment, Like, Save, Follow, Notification, Tag, Image, Video
from ...services.Posts.PostService import *
from ...services.Posts.RecipeService import *
from ...services.Users.UserService import *

class PostSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ('id', 'content', 'userId', 'tags', 'media_file', 'createdAt', 'username')
        
    def create(self, validated_data):
        post = PostService.create_post(
            post_id = validated_data.get('id'),
            userId = validated_data.get('userId'), # Assuming that firebase_uid is provided.
            content=validated_data.get('content'),
            media_file = validated_data.get('media_file', None),
        )
        return post
    
    def get(self, instance):
        if instance:
            return instance.userId.username
        raise serializers.ValidationError("Post with given id does not exist.")
    
    def get_all(self):
        return PostService.get_all_posts()
    
    def get_username(self, instance):
        user_id = instance.userId
        return PostService.get_username(user_id)
    
    def update(self, instance, validated_data):
        post = PostService.update_post(
            post_id=instance.id, 
            title=validated_data.get('title', None),
            content=validated_data.get('content', None)
        )
        if not post:
            raise serializers.ValidationError("Post with given id does not exist.")
        return post

    def delete(self, instance):
        return PostService.delete_post(instance.id)

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 
                  'content', 
                  'author', 
                  'post', 
                  'created_at', 
                  'updated_at']

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['user', 'post', 'created_at']

class SaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Save
        fields = ['user', 'post', 'created_at']

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ['follower', 'followed', 'created_at']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 
                  'user', 
                  'content', 
                  'created_at', 
                  'is_read', 
                  'notification_type', 
                  'post', 
                  'comment', 
                  'like', 
                  'save', 
                  'follow']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name', 'post']

# TO:DO - Add serializers for Recipe, Ingredient, Instruction
# class IngredientSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Ingredient
#         fields = ['name', 'post']

# class RecipeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Recipe
#         fields = ['post']

# class InstructionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Instruction
#         fields = ['step_number', 'description', 'recipe']

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['post', 'image']

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['post', 'video']