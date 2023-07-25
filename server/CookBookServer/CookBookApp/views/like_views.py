from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
import pprint
from ..models import UserProfile, Post, Comment, Like, Save, Follow, Notification

from django.views import View
from django.http import JsonResponse
from ..services.Posts.PostService import LikeService

class LikeView(View):
    def post(self, request, post_id, firebase_uid):
        like = LikeService.create_like(post_id, firebase_uid)
        if like is not None:
            return JsonResponse({"message": "Like created successfully"})
        else:
            return JsonResponse({"error": "Error while creating Like"}, status=400)
    
    def delete(self, request, like_id):
        result = LikeService.delete_like(like_id)
        if result:
            return JsonResponse({"message": "Like deleted successfully"})
        else:
            return JsonResponse({"error": "Error while deleting Like"}, status=400)
