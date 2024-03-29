"""
URL configuration for CookBookServer project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from .views import post_views, user_views, csrf_view, receipt_detection_views, receipt_view

urlpatterns = [
    path('posts/', post_views.PostListView.as_view(), name="post_list"),
    path('user/', user_views.UserListView.as_view(), name="user_list"),
    path('get-csrf/', csrf_view.CsrfTokenView.as_view(), name="get_csrf"),
    path('detect-receipt/', receipt_detection_views.AIDetectionView.as_view(), name="detect_receipt"),
    path('receipt-save/', receipt_view.ReceiptFormView.as_view(), name="receipt_save"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
