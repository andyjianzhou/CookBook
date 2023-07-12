from rest_framework import serializers
from ...models import Post, Comment, Like, Save, Follow, Notification, Tag, Ingredient, Recipe, Instruction, Image, Video, SavedRecipe

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'content', 'author', 'post', 'created_at', 'updated_at']

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
        fields = ['id', 'user', 'content', 'created_at', 'is_read', 'notification_type', 'post', 'comment', 'like', 'save', 'follow']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name', 'post']

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['name', 'post']

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['post']

class InstructionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instruction
        fields = ['step_number', 'description', 'recipe']

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['post', 'image']

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['post', 'video']

class SavedRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedRecipe
        fields = ['user', 'post', 'created_at']
