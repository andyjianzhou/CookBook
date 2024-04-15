from django.http import JsonResponse, HttpResponseBadRequest
from django.views import View
from django.shortcuts import get_object_or_404
from ..models import Recipe
import json

class DetailedRecipe(View):
    def get(self, request, id):
        recipe = get_object_or_404(Recipe, pk=id)
        data = {
            'recipe_id': str(recipe.pk),
            'title': recipe.title,
            'description': recipe.description,
            'ingredients': recipe.ingredients,
            'createdAt': recipe.createdAt.strftime("%Y-%m-%d %H:%M:%S")
        }
        return JsonResponse(data)

    def patch(self, request, id=None):
        try:
            data = json.loads(request.body)
            recipe = get_object_or_404(Recipe, pk=id)
            if 'title' in data:
                recipe.title = data['title']
            if 'description' in data:
                recipe.description = data['description']
            if 'ingredients' in data:
                recipe.ingredients = data['ingredients']
            recipe.save()
            return JsonResponse({'message': 'Recipe updated successfully'})
        except json.JSONDecodeError:
            return HttpResponseBadRequest('Invalid JSON')
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
