import React from 'react'
import { ISavedServices } from './ISavedServices'
import ReceiptDetails from '../../models/ReceiptDetails';
import axiosInstance from '../Utilities/axiosConfig';

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
    
      async saveReceiptDetection(formData: any): Promise<any> {
        // ensure that foods is in json format string
        // formData.foods = JSON.stringify(formData.foods);
        // const response = await axiosInstance.post('/receipts', formData);
      }

      createReceiptDetails(data: any): ReceiptDetails {
        // Transform the data into the structure defined by ReceiptDetails
        // Assuming the response data structure is already similar to ReceiptDetails
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
}
