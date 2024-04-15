from django.http import JsonResponse
from django.views import View
import json
from uuid import UUID
from ..models import Receipt, Product, UserProfile
from datetime import datetime
from django.utils.dateparse import parse_datetime
from django.utils.timezone import is_aware, make_aware
from django.core.exceptions import ObjectDoesNotExist

class ReceiptFormView(View):
    def post(self, request):
        try:
            receipt_id_str = request.POST.get('receipt_id')
            receipt_id = UUID(receipt_id_str)
            store = request.POST.get('store')
            foods_json = request.POST.get('foods')
            firebase_uid = request.POST.get('firebase_uid')
            date_str = request.POST.get('createdAt')
            date = parse_datetime(date_str) if date_str else datetime.now()


            # Retrieve the UserProfile instance for the given firebase_uid, creating one if it doesn't exist
            # Here, user_profile is the object, and created is a boolean indicating if the object was created
            user_profile, created = UserProfile.objects.get_or_create(firebase_uid=firebase_uid)

            # Create a new Receipt instance, associating it with the user and storing the foods as JSON
            receipt = Receipt.objects.create(
                receipt_id=receipt_id,
                store=store,
                userId=user_profile,
                date=date,
            )
            user_profile = UserProfile.objects.get_or_create(firebase_uid=firebase_uid)[0]

            # Create a new Receipt instance, associating it with the user and storing the foods as JSON
            receipt, created = Receipt.objects.get_or_create(
                receipt_id=receipt_id,
                defaults={'store': store, 'userId': user_profile, 'foods': json.loads(foods_json) if foods_json else [], 'date': date}
            )
            
            if not created:
                receipt.store = store
                receipt.userId = user_profile
                receipt.foods = json.loads(foods_json) if foods_json else []
                receipt.save()

            # Handling multiple products from form data
            for key, value in request.POST.items():
                if key.startswith('product_name_'):
                    index = key.split('_')[-1]
                    product_name = value
                    brand = request.POST.get(f'product_brand_{index}', None)
                    price = request.POST.get(f'product_price_{index}', '')

                    # Create and associate each Product instance with the newly created Receipt
                    Product.objects.create(
                        receipt=receipt,
                        product=product_name,
                        brand=brand,
                        price=price
                    )

            return JsonResponse({'message': 'Receipt and products saved successfully'}, status=201)

        except Exception as e:
            # If an error occurs, return a JsonResponse indicating the error
            return JsonResponse({'error': str(e)}, status=400)
        
    def get(self, request):
        firebase_uid = request.GET.get('firebase_uid')
        if firebase_uid:
            try:
                user_profile = UserProfile.objects.get(firebase_uid=firebase_uid)
                receipts = Receipt.objects.filter(userId=user_profile).values()
                return JsonResponse(list(receipts), safe=False, status=200)
            except UserProfile.DoesNotExist:
                return JsonResponse({'error': 'User not found'}, status=404)
        return JsonResponse({'error': 'firebase_uid not provided'}, status=400)

    
