from django.http import JsonResponse, HttpResponse
from django.views import View
from rest_framework import serializers
from rest_framework.parsers import JSONParser
from ..models import Post
from ..serializers.Posts.PostSerializers import PostSerializer

# Create your views
class PostListView(View):
    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        data = JSONParser().parse(request)
        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
class PostDetailView(View):
    """
    request: 
    - GET: get post detail
    - PUT: update post detail
    - DELETE: delete post
    
    pk:
    - post id
    """
    def put(self, request, post_id):
        try:
            post = Post.objects.get(pk=post_id)
        except Post.DoesNotExist:
            return JsonResponse({"error": "Post not found"}, status=404)

        data = JSONParser().parse(request)
        serializer = PostSerializer(post, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
