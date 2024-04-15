import FridgeDetails from "../../models/FridgeDetails";
import ReceiptDetails from "../../models/ReceiptDetails";
import { RecipeDetails } from "../../models/RecipeDetails";
import { ApiResponse } from "../Scan/CapturedImage";

export interface ISavedServices {
    getSaved(id: string): Promise<any>;
    getSavedHistory(id: string): Promise<any>;
    getSavedFavourites(id: string): Promise<any>;
    updateSaved(id: string, saved: any): Promise<any>;
    deleteSaved(id: string): Promise<any>;
    createComment(id: string, comment: any): Promise<any>;
    deleteComment(id: string, commentId: string): Promise<any>;
    likeSaved(id: string): Promise<any>;
    unlikeSaved(id: string): Promise<any>;
    likeComment(id: string, commentId: string): Promise<any>;
    unlikeComment(id: string, commentId: string): Promise<any>;
    replyComment(id: string, commentId: string, reply: any): Promise<any>;
    deleteReply(id: string, commentId: string, replyId: string): Promise<any>;
    saveReceiptDetection(guid: string, userId: string | undefined, receiptDetails: ReceiptDetails | null, csrfToken: string | null, createdAt: string): Promise<any>;
    saveFridgeDetection(guid: string, userId: string | undefined, fridgeDetails: FridgeDetails | null, csrfToken: string | null, createdAt: string): Promise<any>;
    createReceiptDetails(data: any): ReceiptDetails;
    createFridgeDetails(data: ApiResponse): FridgeDetails;
    updateRecipeDetails(data: any, csrfToken: string | null, url: string): Promise<RecipeDetails>;
}