// imageService.ts
import axiosInstance from "../Utilities/axiosConfig";

const apiEndpoints = {
  detectReceipt: 'http://127.0.0.1:8000/api/detect-receipt/',
  detectFridge: 'http://127.0.0.1:8000/api/detect-fridge/',
  generateRecipe: 'http://127.0.0.1:8000/api/detect-fridge/'
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

export const generateRecipe = async (formData: FormData, csrfToken: string| null) => {
  try {
    const response = await axiosInstance.post(apiEndpoints.generateRecipe, formData, {
      headers: {
        'X-CSRFToken': csrfToken,
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data; 
  } catch (error) {
    console.error(`Error generating recipe:`, error);
    throw error; 
  }
}
