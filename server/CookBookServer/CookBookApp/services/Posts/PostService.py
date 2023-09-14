from ...models import UserProfile, Post, Like, Save, Follow, Tag, Comment, Notification
from django.core.exceptions import ObjectDoesNotExist

class PostService:
    @staticmethod
    def create_post(post_id, userId, content, media_file=None):
        try:
            post = Post(id = post_id,
                        userId=userId,
                        content=content, 
                        media_file=media_file
                        )
            post.save()
            return post
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_all_posts():
        return Post.objects.all()
    
    @staticmethod
    def get_username(user_Id):
        user_profile = UserProfile.objects.filter(firebase_uid=user_Id.firebase_uid).first()
        if user_profile:
            return user_profile.username
        return "Unknown User"


    @staticmethod
    def get_post_by_id(post_id):
        try:
            return Post.objects.get(id=post_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def update_post(post_id, title=None, content=None):
        try:
            post = Post.objects.get(id=post_id)
            if title is not None:
                post.title = title
            if content is not None:
                post.content = content
            post.save()
            return post
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def delete_post(post_id):
        try:
            post = Post.objects.get(id=post_id)
            post.delete()
        except ObjectDoesNotExist:
            return None

class CommentService:
    @staticmethod
    def create_comment(content, post_id, firebase_uid):
        try:
            user_profile = UserProfile.objects.get(firebase_uid=firebase_uid)
            post = Post.objects.get(id=post_id)
            comment = Comment(content=content, post=post, author=user_profile)
            comment.save()
            return comment
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_comment_by_id(comment_id):
        try:
            return Comment.objects.get(id=comment_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def update_comment(comment_id, content=None):
        try:
            comment = Comment.objects.get(id=comment_id)
            if content is not None:
                comment.content = content
            comment.save()
            return comment
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def delete_comment(comment_id):
        try:
            comment = Comment.objects.get(id=comment_id)
            comment.delete()
        except ObjectDoesNotExist:
            return None

class SaveService:
    @staticmethod
    def create_save(post_id, firebase_uid):
        try:
            user_profile = UserProfile.objects.get(firebase_uid=firebase_uid)
            post = Post.objects.get(id=post_id)
            save = Save(user=user_profile, post=post)
            save.save()
            return save
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_save_by_id(save_id):
        try:
            return Save.objects.get(id=save_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def delete_save(save_id):
        try:
            save = Save.objects.get(id=save_id)
            save.delete()
        except ObjectDoesNotExist:
            return None


class LikeService:
    @staticmethod
    def create_like(post_id, firebase_uid):
        try:
            user_profile = UserProfile.objects.get(firebase_uid=firebase_uid)
            post = Post.objects.get(id=post_id)
            like = Like(user=user_profile, post=post)
            like.save()
            return like
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_like_by_id(like_id):
        try:
            return Like.objects.get(id=like_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def delete_like(like_id):
        try:
            like = Like.objects.get(id=like_id)
            like.delete()
        except ObjectDoesNotExist:
            return None


class TagService:
    @staticmethod
    def create_tag(name, post_id):
        try:
            post = Post.objects.get(id=post_id)
            tag = Tag(name=name, post=post)
            tag.save()
            return tag
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_tag_by_id(tag_id):
        try:
            return Tag.objects.get(id=tag_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def update_tag(tag_id, name=None):
        try:
            tag = Tag.objects.get(id=tag_id)
            if name is not None:
                tag.name = name
            tag.save()
            return tag
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def delete_tag(tag_id):
        try:
            tag = Tag.objects.get(id=tag_id)
            tag.delete()
        except ObjectDoesNotExist:
            return None