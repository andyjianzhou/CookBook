from ...models import UserProfile, Post

def create_post(title, content, firebase_uid):
    user_profile = UserProfile.objects.get(firebase_uid=firebase_uid)
    post = Post(title=title, content=content, author=user_profile)
    post.save()

def get_all_posts():
    return Post.objects.all()

def get_posts_for_user(firebase_uid):
    user_profile = UserProfile.objects.get(firebase_uid=firebase_uid)
    return user_profile.posts.all()
