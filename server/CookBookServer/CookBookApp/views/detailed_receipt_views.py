from django.http import JsonResponse, HttpResponseBadRequest
from django.views import View
from django.shortcuts import get_object_or_404
from ..models import Receipt
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

class DetailedReceipt(View):
    def get(self, request, id):
        receipt = get_object_or_404(Receipt, pk=id)
        data = {
            'receipt_id': str(receipt.pk),  
            'foods': receipt.foods,  
            'createdAt': receipt.date.strftime("%Y-%m-%d %H:%M:%S") 
        }
        return JsonResponse(data)

    def post(self, request):
        pass
    
    
    def patch(self, request, id=None):
        try:
            data = json.loads(request.body)
            receipt = get_object_or_404(Receipt, pk=id)
            if 'updated_foods' in data:
                receipt.foods = data['updated_foods']
                receipt.save()
                return JsonResponse({'message': 'Receipt updated successfully'})
            return HttpResponseBadRequest('No updated_foods field provided')
        except json.JSONDecodeError:
            return HttpResponseBadRequest('Invalid JSON')
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
