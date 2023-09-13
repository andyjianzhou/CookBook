from django.http import JsonResponse, HttpResponse
from django.views import View
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from ..models import Post
from ..serializers.Posts.PostSerializers import PostSerializer
import json

# Create your views
class PostListView(View):
    parser_classes = (FormParser, MultiPartParser)

    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        # First, get the JSON string from 'post_data'
        post_data_json_str = request.POST.get('post_data')
        
        # Convert the JSON string to a dictionary
        post_data = json.loads(post_data_json_str)
        
        # Get the media file, if present
        media_file = request.FILES.get('media_file', None)
        
        # Add the media_file to the post_data dictionary
        if media_file:
            post_data['media_file'] = media_file
        else:
            post_data['media_file'] = None

        # Now use the post_data dictionary with the serializer
        serializer = PostSerializer(data=post_data)
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
