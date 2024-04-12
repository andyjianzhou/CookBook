export interface IRecipeServices {
    getAllRecipes: () => Promise<any>;
    getRecipe: (id: string) => Promise<any>;
    createRecipe: (recipe: any) => Promise<any>;
    editRecipe: (id: string, recipe: any) => Promise<any>;
    deleteRecipe: (id: string) => Promise<any>;
    nameRecipe: (id: string, name: string) => Promise<any>;
    convertToPost: (id: string) => Promise<any>;
    receiptToRecipe(id: string): Promise<any>;
    pictureToRecipe(id: string): Promise<any>;
}