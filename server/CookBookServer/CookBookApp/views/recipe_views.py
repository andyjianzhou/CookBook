from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from ..models import Recipe, UserProfile
import json

class RecipeView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            user_profile = UserProfile.objects.get(firebase_uid=data['userId'])
            recipe = Recipe.objects.create(
                userId=user_profile,
                title=data['title'],
                ingredients=data['ingredients'],
                description=data['description']
            )
            return JsonResponse({'message': 'Recipe created successfully', 'recipe_id': str(recipe.recipe_id)}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
