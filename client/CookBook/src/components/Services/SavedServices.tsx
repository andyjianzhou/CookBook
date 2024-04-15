import React from 'react'
import { ISavedServices } from './ISavedServices'
import ReceiptDetails from '../../models/ReceiptDetails';
import FridgeDetails from '../../models/FridgeDetails';
import axiosInstance from '../Utilities/axiosConfig';
import { ApiResponse } from '../Scan/CapturedImage';
import { RecipeDetails } from '../../models/RecipeDetails';

export class SavedServices implements ISavedServices {
    
      async getSaved(id: string): Promise<any> {
        // placeholder implementation
        return Promise.resolve();
      }
    
      async getSavedHistory(id: string): Promise<any> {
        // placeholder implementation
        return Promise.resolve();
      }
    
      async getSavedFavourites(id: string): Promise<any> {
        // placeholder implementation
        return Promise.resolve();
      }
    
      async updateSaved(id: string, saved: any): Promise<any> {
        // placeholder implementation
        return Promise.resolve();
      }
    
      async deleteSaved(id: string): Promise<any> {
        // placeholder implementation
        return Promise.resolve();
      }
    
      async createComment(id: string, comment: any): Promise<any> {
        // placeholder implementation
        return Promise.resolve();
      }
    
      async deleteComment(id: string, commentId: string): Promise<any> {
        // placeholder implementation
        return Promise.resolve();
      }
    
      async likeSaved(id: string): Promise<any> {
        // placeholder implementation
        return Promise.resolve();
      }
    
      async unlikeSaved(id: string): Promise<any> {
     // placeholder implementation
     return Promise.resolve();
      }
    
      async likeComment(id: string, commentId: string): Promise<any> {
        // placeholder implementation
        return Promise.resolve();
      }
    
      async unlikeComment(id: string, commentId: string): Promise<any> {
        // placeholder implementation
        return Promise.resolve();
      }
    
      async replyComment(id: string, commentId: string, reply: any): Promise<any> {
        // placeholder implementation
        return Promise.resolve();
      }
    
      async deleteReply(id: string, commentId: string, replyId: string): Promise<any> {
        // placeholder implementation
        return Promise.resolve();
      }
    
      async saveReceiptDetection(guid: string, userId: string | undefined, receiptDetails: ReceiptDetails | null, csrfToken: string | null, createdAt: string): Promise<any> {
        // ensure that foods is in json format string
        const combinedReceiptDetails = {
          receipt_id: guid,
          firebase_uid: userId,
          store: receiptDetails?.store,
          foods: JSON.stringify(receiptDetails?.foods),
          products: receiptDetails?.products,
          createdAt: createdAt,
        }

        console.log("Combined with userID: ", combinedReceiptDetails);
        try {
          const response = await axiosInstance.post('http://127.0.0.1:8000/api/receipt-save/', combinedReceiptDetails, {
              headers: {
                  'X-CSRFToken': csrfToken,
              }
          });
          return response.data;
      } catch (error) {
          console.error("Error saving receipt:", error);
          throw error;
      }
    }

    async saveFridgeDetection(guid: string, userId: string | undefined, fridgeDetails: FridgeDetails | null, csrfToken: string | null, createdAt: string): Promise<any> {
        // ensure that foods is in json format string
        const combinedFridgeDetails = {
          fridge_id: guid,
          firebase_uid: userId,
          foods: JSON.stringify(fridgeDetails?.foods),
          createdAt: createdAt,
        }

        console.log("Combined with userID: ", combinedFridgeDetails);
        try {
          const response = await axiosInstance.post('http://127.0.0.1:8000/api/fridge-save/', combinedFridgeDetails, {
              headers: {
                  'X-CSRFToken': csrfToken,
              }
          });
          return response.data; 
        } catch (error) {
          console.error("Error saving fridge:", error);
          throw error;
        }
      }

      createReceiptDetails(data: any): ReceiptDetails {
        return {
            store: data.store,
            foods: data.foods,
            products: data.products.map((product: any) => ({
                product: product.product,
                brand: product.brand,
                price: product.price,
            })),
        };
      };

      createFridgeDetails(responseData: ApiResponse): FridgeDetails {
        const { classes, names } = responseData;

        const uniqueClasses = Array.from(new Set(classes.map((cls: number) => Math.round(cls))));
        const foodNames = uniqueClasses.map(cls => names[cls]);
    
        return {
            foods: foodNames
        };
      }

      async updateRecipeDetails(data: any, csrfToken: string | null, url: string): Promise<RecipeDetails> {
        try {
          const payload = JSON.stringify({
            title: data.title,
            description: data.description,
            ingredients: data.ingredients
          });
      
          const response = await axiosInstance.patch(url, payload, {
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json',
            }
          });
          return response.data;
        } catch (error) {
          console.error('Failed to update recipe details:', error);
          throw error;
        }
      }
      
}
