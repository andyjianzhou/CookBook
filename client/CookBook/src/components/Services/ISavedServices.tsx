import ReceiptDetails from "../../models/ReceiptDetails";

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
    saveReceiptDetection(guid: string, userId: string | undefined, receiptDetails: ReceiptDetails | null, csrfToken: string | null): Promise<any>;
    createReceiptDetails(data: any): ReceiptDetails;
}