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
from .views import post_views, recipe_view, user_views, csrf_view, receipt_detection_views, receipt_view, fridge_detection_views, fridge_view, detailed_fridge_views, detailed_receipt_views, detailed_recipe_views, recipe_detection_views

urlpatterns = [
    path('posts/', post_views.PostListView.as_view(), name="post_list"),
    path('user/', user_views.UserListView.as_view(), name="user_list"),
    path('get-csrf/', csrf_view.CsrfTokenView.as_view(), name="get_csrf"),
    path('detect-receipt/', receipt_detection_views.AIDetectionView.as_view(), name="detect_receipt"),
    path('receipt-save/', receipt_view.ReceiptFormView.as_view(), name="receipt_save"),
    path('detect-fridge/', fridge_detection_views.FridgeDetectionView.as_view(), name="detect_fridge"),
    path('fridge-save/', fridge_view.FridgeFormView.as_view(), name="fridge_save"),
    path('receipt/<uuid:id>/', detailed_receipt_views.DetailedReceipt.as_view(), name='receipt_detail'),
    path('fridge/<uuid:id>/', detailed_fridge_views.DetailedFridge.as_view(), name='fridge_item_detail'),
    path('recipe/<uuid:id>/', detailed_recipe_views.DetailedRecipe.as_view(), name='recipe_detail'),
    path('recipes/', recipe_view.RecipeView.as_view(), name='recipe_list'),
    path('generate-recipe/', recipe_detection_views.AIRecipeGeneratorView.as_view(), name='generate_recipe'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
