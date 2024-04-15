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
            )
            
            user_profile = UserProfile.objects.get_or_create(firebase_uid=firebase_uid)[0]

            # Create a new Receipt instance, associating it with the user and storing the foods as JSON
            fridge, created = FridgeDetection.objects.get_or_create(
                fridge_detection_id=fridge_id,
                defaults={'userId': user_profile, 'foods': json.loads(foods_json) if foods_json else [], 'date': date}
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
        fridge_id = request.GET.get('fridge_id')

        if firebase_uid:
            try:
                user_profile = UserProfile.objects.get(firebase_uid=firebase_uid)
                fridges = FridgeDetection.objects.filter(userId=user_profile)
                return JsonResponse({'fridges': [fridge.to_dict() for fridge in fridges]}, status=200)
            except ObjectDoesNotExist:
                return JsonResponse({'error': 'User not found'}, status=404)
        elif fridge_id:
            try:
                fridge = FridgeDetection.objects.get(fridge_detection_id=fridge_id)
                return JsonResponse({'fridge': fridge.to_dict()}, status=200)
            except ObjectDoesNotExist:
                return JsonResponse({'error': 'Fridge detection not found'}, status=404)
        else:
            return JsonResponse({'error': 'Missing firebase_uid or fridge_id'}, status=400)