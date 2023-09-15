# views.py
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views import View

class CsrfTokenView(View):
    def get(self, request):
        csrf_token = get_token(request)  # This will set a cookie named 'csrftoken'
        return JsonResponse({"csrfToken": csrf_token})