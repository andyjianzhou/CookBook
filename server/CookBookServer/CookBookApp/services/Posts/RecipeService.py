# from ...models import UserProfile, Post, Ingredient, Recipe, Instruction, Image, Video
# from django.core.exceptions import ObjectDoesNotExist

# class IngredientService:
#     @staticmethod
#     def create_ingredient(name):
#         ingredient = Ingredient(name=name)
#         ingredient.save()
#         return ingredient
    
#     @staticmethod
#     def get_ingredient_by_id(ingredient_id):
#         try:
#             return Ingredient.objects.get(id=ingredient_id)
#         except ObjectDoesNotExist:
#             return None

#     @staticmethod
#     def update_ingredient(ingredient_id, name=None):
#         try:
#             ingredient = Ingredient.objects.get(id=ingredient_id)
#             if name is not None:
#                 ingredient.name = name
#             ingredient.save()
#             return ingredient
#         except ObjectDoesNotExist:
#             return None

#     @staticmethod
#     def delete_ingredient(ingredient_id):
#         try:
#             ingredient = Ingredient.objects.get(id=ingredient_id)
#             ingredient.delete()
#         except ObjectDoesNotExist:
#             return None