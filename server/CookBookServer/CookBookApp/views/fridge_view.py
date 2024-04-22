from django.http import JsonResponse
from django.views import View
import json
from uuid import UUID
from ..models import FridgeDetection, UserProfile
from datetime import datetime
from django.utils.dateparse import parse_datetime
from django.core.exceptions import ObjectDoesNotExist

class FridgeFormView(View):
    def post(self, request):
        try:
            fridge_id_str = request.POST.get('fridge_id')
            fridge_id = UUID(fridge_id_str)
            foods_json = request.POST.get('foods')
            firebase_uid = request.POST.get('firebase_uid')
            date_str = request.POST.get('createdAt')
            date = parse_datetime(date_str) if date_str else datetime.now()
            
            user_profile, created = UserProfile.objects.get_or_create(firebase_uid=firebase_uid)
            
            fridge = FridgeDetection.objects.create(
                fridge_detection_id=fridge_id,
                userId=user_profile,
                date=date,
                foods=json.loads(foods_json) if foods_json else [],
            )
            
            if not created:
                fridge.userId = user_profile
                fridge.foods = json.loads(foods_json) if foods_json else []
                fridge.save()
        
            return JsonResponse({'success': 'Fridge detection saved successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
        
    def get(self, request):
        firebase_uid = request.GET.get('firebase_uid')
        if firebase_uid:
            try:
                user_profile = UserProfile.objects.get(firebase_uid=firebase_uid)
                fridge_data = FridgeDetection.objects.filter(userId=user_profile).values()
                return JsonResponse(list(fridge_data), safe=False, status=200)
            except UserProfile.DoesNotExist:
                return JsonResponse({'error': 'User not found'}, status=404)
        return JsonResponse({'error': 'firebase_uid not provided'}, status=400)
