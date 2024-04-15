from django.http import JsonResponse, HttpResponseBadRequest
from django.views import View
from django.shortcuts import get_object_or_404
from ..models import FridgeDetection
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

class DetailedFridge(View):
    def get(self, request, id):
        fridge = get_object_or_404(FridgeDetection, pk=id)
        data = {
            'fridge_id': str(fridge.pk), 
            'foods': fridge.foods,
            'createdAt': fridge.date.strftime("%Y-%m-%d %H:%M:%S") 
        }
        
        print(data)
        return JsonResponse(data)

    def post(self, request):
        pass
    
    def patch(self, request, id=None):
        try:
            data = json.loads(request.body)
            fridge = get_object_or_404(FridgeDetection, pk=id)
            if 'updated_foods' in data:
                fridge.foods = data['updated_foods']
                fridge.save()
                return JsonResponse({'message': 'fridge updated successfully'})
            return HttpResponseBadRequest('No updated_foods field provided')
        except json.JSONDecodeError:
            return HttpResponseBadRequest('Invalid JSON')
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
