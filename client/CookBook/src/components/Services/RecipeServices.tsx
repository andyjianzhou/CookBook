import axiosInstance from '../Utilities/axiosConfig';
import { IRecipeServices } from './IRecipeServices'

export class RecipeServices implements IRecipeServices {
    async getAllRecipes(): Promise<any> {
        // actual implementation here
        return Promise.resolve();
    }

    async getRecipe(id: string): Promise<any> {
        // actual implementation here
        return Promise.resolve();
    }

    async createRecipe(recipeDetails: any, csrfToken: string | null): Promise<any> {
        try {
            const response = await axiosInstance.post('http://127.0.0.1:8000/api/recipes/', JSON.stringify(recipeDetails), {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error creating recipe:', error);
            return error;
        }
    }

    async editRecipe(id: string, recipe: any): Promise<any> {
        // actual implementation here
        return Promise.resolve();
    }

    async deleteRecipe(id: string): Promise<any> {
        // actual implementation here
        return Promise.resolve();
    }

    async nameRecipe(id: string, name: string): Promise<any> {
        // actual implementation here
        return Promise.resolve();
    }

    async receiptToRecipe(id: string): Promise<any> {
        // actual implementation here
        return Promise.resolve();
    }

    async convertToPost(id: string): Promise<any> {
        // actual implementation here
        return Promise.resolve();
    }

    async pictureToRecipe(id: string): Promise<any> {
        // actual implementation here
        return Promise.resolve();
    }
}