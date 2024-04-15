from django.http import JsonResponse
from django.views import View
from ..services.aiutility.FridgeDetection import detect_fridge
import json
import cv2
import base64

def file_to_base64(file):
    return base64.b64encode(file.read()).decode('utf-8')

class FridgeDetectionView(View):
    def post(self, request, *args, **kwargs):
        if 'image' not in request.FILES:
            return JsonResponse({'error': 'No image provided'}, status=400)

        image_file = request.FILES['image']
        image_file = file_to_base64(image_file)
        image_file = f"data:image/jpeg;base64,{image_file}"
        
        result = detect_fridge(image_file)
        if result:
            classes, names, image = result
            retval, buffer = cv2.imencode('.jpg', image)
            image_base64_with_detections = base64.b64encode(buffer).decode('utf-8')
            result = {
                'classes': classes,
                'names': names,
                'image_with_detections': f"data:image/jpeg;base64,{image_base64_with_detections}"
            }
            
        else:
            result = {'error': 'An error occurred'}

        return JsonResponse(result)
    
