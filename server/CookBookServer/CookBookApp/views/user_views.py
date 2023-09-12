from django.http import JsonResponse
from django.views import View
from rest_framework.parsers import JSONParser
from ..models import UserProfile
from ..serializers.Users.UsersSerializers import UserProfileSerializer  # Assuming you have this serializer

class UserListView(View):
    def get(self, request):
        users = UserProfile.objects.all()
        serializer = UserProfileSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        data = JSONParser().parse(request)
        serializer = UserProfileSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


class UserDetailView(View):
    """
    request:
    - GET: get user detail
    - PUT: update user detail
    - DELETE: delete user
    
    pk:
    - user id
    """
    def get(self, request, user_id):
        try:
            user = UserProfile.objects.get(pk=user_id)
            serializer = UserSerializer(user)
            return JsonResponse(serializer.data)
        except UserProfile.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)

    def put(self, request, user_id):
        try:
            user = UserProfile.objects.get(pk=user_id)
        except UserProfile.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)

        data = JSONParser().parse(request)
        serializer = UserSerializer(user, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    def delete(self, request, user_id):
        try:
            user = UserProfile.objects.get(pk=user_id)
            user.delete()
            return JsonResponse({"success": "User deleted successfully"}, status=204)
        except UserProfile.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)
