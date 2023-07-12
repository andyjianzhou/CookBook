from ...models import UserProfile, Post, Like, Save, Follow, Tag

class PostService:
    @staticmethod
    def create_post(title, content, firebase_uid):
        user_profile = UserProfile.objects.get(firebase_uid=firebase_uid)
        post = Post(title=title, content=content, author=user_profile)
        post.save()
        return post

    @staticmethod
    def get_all_posts():
        return Post.objects.all()

    @staticmethod
    def get_posts_for_user(firebase_uid):
        user_profile = UserProfile.objects.get(firebase_uid=firebase_uid)
        return user_profile.posts.all()

    @staticmethod
    def create_like(post_id, firebase_uid):
        user_profile = UserProfile.objects.get(firebase_uid=firebase_uid)
        post = Post.objects.get(id=post_id)
        like = Like(user=user_profile, post=post)
        like.save()
        return like

    def get_likes_for_post(post_id):
        post = Post.objects.get(id=post_id)
        return post.likes.all()

    @staticmethod
    def create_save(post_id, firebase_uid):
        user_profile = UserProfile.objects.get(firebase_uid=firebase_uid)
        post = Post.objects.get(id=post_id)
        save = Save(user=user_profile, post=post)
        save.save()
        return save
    
    def get_saves_for_post(post_id):
        post = Post.objects.get(id=post_id)
        return post.saves.all()

    @staticmethod
    def create_follow(followed_firebase_uid, follower_firebase_uid):
        follower_profile = UserProfile.objects.get(firebase_uid=follower_firebase_uid)
        followed_profile = UserProfile.objects.get(firebase_uid=followed_firebase_uid)
        follow = Follow(follower=follower_profile, followed=followed_profile)
        follow.save()
        return follow
    
    def get_follows_for_user(firebase_uid):
        user_profile = UserProfile.objects.get(firebase_uid=firebase_uid)
        return user_profile.follows.all()

    @staticmethod
    def create_tag(name, post_id):
        post = Post.objects.get(id=post_id)
        tag = Tag(name=name, post=post)
        tag.save()
        return tag
    
    def get_tags_for_post(post_id):
        post = Post.objects.get(id=post_id)
        return post.post_tags.all()
