// imageService.ts
import { RecipeDetails } from "../../models/RecipeDetails";
import axiosInstance from "../Utilities/axiosConfig";

const apiEndpoints = {
  detectReceipt: 'http://127.0.0.1:8000/api/detect-receipt/',
  detectFridge: 'http://127.0.0.1:8000/api/detect-fridge/',
  generateRecipe: 'http://127.0.0.1:8000/api/generate-recipe/'
};

export const uploadImageForDetection = async (formData: FormData, mode: string, csrfToken: string| null) => {
  const endpoint = mode === 'receipts' ? apiEndpoints.detectReceipt : apiEndpoints.detectFridge;
  try {
    const response = await axiosInstance.post(endpoint, formData, {
      headers: {
        'X-CSRFToken': csrfToken,
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data; 
  } catch (error) {
    console.error(`Error uploading image for mode ${mode}:`, error);
    throw error;
  }
}

export const generateRecipe = async (data: any, csrfToken: string| null) => {
  try {
    const response = await axiosInstance.post(apiEndpoints.generateRecipe, data, {
      headers: {
        'X-CSRFToken': csrfToken,
        'Content-Type': 'application/json',
      }
    });

    const recipe: RecipeDetails = {
      id: response.data.id,
      title: response.data.title,
      description: response.data.description,
      ingredients: response.data.ingredients.map((ing: { name: any; measure: any; }) => ({ name: ing.name, measure: ing.measure })),
      createdAt: new Date().toISOString()
    };
    return recipe;
  } catch (error) {
    console.error(`Error generating recipe:`, error);
    throw error; 
  }
}
