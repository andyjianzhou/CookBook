import { RecipeDetails } from "../../models/RecipeDetails";

export interface IRecipeServices {
    getAllRecipes: (userId: string) => Promise<RecipeDetails[]>;
    getRecipe: (id: string) => Promise<any>;
    createRecipe: (formData: any, csrfToken: string | null) => Promise<any>;
    editRecipe: (id: string, recipe: any) => Promise<any>;
    deleteRecipe: (id: string) => Promise<any>;
    nameRecipe: (id: string, name: string) => Promise<any>;
    convertToPost: (id: string) => Promise<any>;
    receiptToRecipe(id: string): Promise<any>;
    pictureToRecipe(id: string): Promise<any>;
}