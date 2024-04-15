from django.http import JsonResponse, HttpResponseBadRequest
from django.views import View
from django.shortcuts import get_object_or_404
from ..models import Recipe
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

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

    def post(self, request):
        pass
    
    
    def patch(self, request, id=None):
        try:
            data = json.loads(request.body)
            recipe = get_object_or_404(recipe, pk=id)
            recipe.title = data['title']
            recipe.description = data['description']
            recipe.ingredients = data['ingredients']
            recipe.save()
            return JsonResponse({'message': 'recipe updated successfully'})
        except json.JSONDecodeError:
            return HttpResponseBadRequest('Invalid JSON')
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
