from ...models import UserProfile, Post, Ingredient, Recipe, Instruction, Image, Video, SavedRecipe

class RecipeService:
    @staticmethod
    def create_ingredient(name, post_id):
        post = Post.objects.get(id=post_id)
        ingredient = Ingredient(name=name, post=post)
        ingredient.save()
        return ingredient
    
    @staticmethod
    def get_ingredients_for_post(post_id):
        post = Post.objects.get(id=post_id)
        return post.ingredients.all()

    @staticmethod
    def create_recipe(post_id):
        post = Post.objects.get(id=post_id)
        recipe = Recipe(post=post)
        recipe.save()
        return recipe
    
    @staticmethod
    def get_recipe_for_post(post_id):
        post = Post.objects.get(id=post_id)
        return post.recipe

    @staticmethod
    def create_instruction(step_number, description, recipe_id):
        recipe = Recipe.objects.get(id=recipe_id)
        instruction = Instruction(step_number=step_number, description=description, recipe=recipe)
        instruction.save()
        return instruction
    
    @staticmethod
    def get_instructions_for_recipe(recipe_id):
        recipe = Recipe.objects.get(id=recipe_id)
        return recipe.instructions.all()

    @staticmethod
    def create_image(post_id, image):
        post = Post.objects.get(id=post_id)
        image = Image(post=post, image=image)
        image.save()
        return image
    
    @staticmethod
    def get_images_for_post(post_id):
        post = Post.objects.get(id=post_id)
        return post.images.all()

    @staticmethod
    def create_video(post_id, video):
        post = Post.objects.get(id=post_id)
        video = Video(post=post, video=video)
        video.save()
        return video
    
    @staticmethod
    def get_videos_for_post(post_id): 
        post = Post.objects.get(id=post_id)
        return post.videos.all()

    @staticmethod
    def create_saved_recipe(user_id, post_id):
        user = UserProfile.objects.get(firebase_uid=user_id)
        post = Post.objects.get(id=post_id)
        saved_recipe = SavedRecipe(user=user, post=post)
        saved_recipe.save()
        return saved_recipe
    
    @staticmethod
    def get_saved_recipes_for_user(user_id):
        user = UserProfile.objects.get(firebase_uid=user_id)
        return user.saved_recipes.all()