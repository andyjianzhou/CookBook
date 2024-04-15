from django.http import JsonResponse
from django.views import View
from ..services.aiutility.RecipeGenerator import analyze_text
import json
import base64

def convert_json_to_string(json_data):
    return json.dumps(json_data)

class AIRecipeGeneratorView(View):
    def post(self, request):
        json_data = json.loads(request.body)
        text = convert_json_to_string(json_data)
        
        result = analyze_text(text)
        if result is not None:
            result = json.loads(result)
        else:
            result = {'error': 'An error occurred'}
        return JsonResponse(result)
    
