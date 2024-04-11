from django.http import JsonResponse
from django.views import View
import json
from uuid import UUID
from ..models import Receipt, Product, UserProfile  # Adjust the import path as needed

class ReceiptFormView(View):
    def post(self, request):
        try:
            receipt_id_str = request.POST.get('receipt_id')
            receipt_id = UUID(receipt_id_str)
            store = request.POST.get('store')
            foods_json = request.POST.get('foods')
            firebase_uid = request.POST.get('firebase_uid')

            # Retrieve the UserProfile instance for the given firebase_uid, creating one if it doesn't exist
            # Here, user_profile is the object, and created is a boolean indicating if the object was created
            user_profile, created = UserProfile.objects.get_or_create(firebase_uid=firebase_uid)

            # Create a new Receipt instance, associating it with the user and storing the foods as JSON
            receipt = Receipt.objects.create(
                receipt_id=receipt_id,
                store=store,
                userId=user_profile,  # Ensure you use the correct field name for the ForeignKey relation to UserProfile
            )
            user_profile = UserProfile.objects.get_or_create(firebase_uid=firebase_uid)[0]

            # Create a new Receipt instance, associating it with the user and storing the foods as JSON
            receipt, created = Receipt.objects.get_or_create(
                receipt_id=receipt_id,
                defaults={'store': store, 'userId': user_profile, 'foods': json.loads(foods_json) if foods_json else []}
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
        # Retrieve all Receipt instances and serialize them to JSON
        # Create a serializer and service layer to handle this logic in a more organized way
        receipts = list(Receipt.objects.values())
        return JsonResponse(receipts, safe=False)
