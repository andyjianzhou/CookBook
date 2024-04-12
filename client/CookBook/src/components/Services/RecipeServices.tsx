import { IRecipeServices } from './IRecipeServices'

class RecipeServices implements IRecipeServices {
    async getAllRecipes(): Promise<any> {
        // actual implementation here
        return Promise.resolve();
    }

    async getRecipe(id: string): Promise<any> {
        // actual implementation here
        return Promise.resolve();
    }

    async createRecipe(recipe: any): Promise<any> {
        // actual implementation here
        return Promise.resolve();
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