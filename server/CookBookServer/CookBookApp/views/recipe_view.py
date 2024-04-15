from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from ..models import Recipe, UserProfile
import json
from django.utils.dateparse import parse_datetime

class RecipeView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            user_profile = UserProfile.objects.get(firebase_uid=data['userId'])
            recipe = Recipe.objects.create(
                userId=user_profile,
                title=data['title'],
                ingredients=data['ingredients'],
                description=data['description'],
                createdAt=parse_datetime(data['createdAt']) if data['createdAt'] else datetime.now()
            )
            return JsonResponse({'message': 'Recipe created successfully', 'recipe_id': str(recipe.recipe_id)}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    
    def get(self, request):
        firebase_uid = request.GET.get('firebase_uid')
        if firebase_uid:
            try:
                user_profile = UserProfile.objects.get(firebase_uid=firebase_uid)
                recipes = Recipe.objects.filter(userId=user_profile)
                return JsonResponse({'recipes': list(recipes.values())}, status=200)
            except UserProfile.DoesNotExist:
                return JsonResponse({'error': 'User not found'}, status=404)
        else:
            return JsonResponse({'error': 'No firebase_uid provided'}, status=400)
        
