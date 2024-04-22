from django.http import JsonResponse
from django.views import View
from ..services.aiutility.ReceiptDetection import analyze_image
import json
import base64

def file_to_base64(file):
    return base64.b64encode(file.read()).decode('utf-8')

class AIDetectionView(View):
    def post(self, request, *args, **kwargs):
        if 'image' not in request.FILES:
            return JsonResponse({'error': 'No image provided'}, status=400)

        image_file = request.FILES['image']
        image_file = file_to_base64(image_file)
        image_file = f"data:image/jpeg;base64,{image_file}"
        
        result = analyze_image(image_file)
        if result is not None:
            result = json.loads(result)
        else:
            result = {'error': 'An error occurred'}

        return JsonResponse(result) # Return the result as a JSON response
    
