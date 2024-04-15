import axiosInstance from "../Utilities/axiosConfig";
import FridgeDetails from "../../models/FridgeDetails";
import ReceiptDetails from "../../models/ReceiptDetails";

const LoadFridgeReceiptService = async (userId: string | undefined) => {
    if (!userId) {
        console.error('No user ID provided');
        return null;
    }

    try {
        const receiptResponse = await axiosInstance.get(`http://127.0.0.1:8000/api/receipt-save/?firebase_uid=${userId}`);
        const fridgeResponse = await axiosInstance.get(`http://127.0.0.1:8000/api/fridge-save/?firebase_uid=${userId}`);
        
        console.log(receiptResponse)
        // Convert to models
        const receiptDetails: ReceiptDetails[] = Array.isArray(receiptResponse.data) ? receiptResponse.data.map((item: any) => ({
            store: item.store,
            foods: item.foods || [], 
            products: Array.isArray(item.products) ? item.products.map((prod: any) => ({
                product: prod.product,
                brand: prod.brand || null,
                price: prod.price.toString()
            })) : [],
            createdAt: item.createdAt
        })) : [];

        const fridgeDetails: FridgeDetails[] = Array.isArray(fridgeResponse.data) ? fridgeResponse.data.map((item: any) => ({
            foods: item.foods || [],
            createdAt: item.createdAt 
        })) : [];

        console.log('Receipts:', receiptDetails);
        console.log('Fridge Data:', fridgeDetails);
        
        return {
            receiptsDetails: receiptDetails,
            fridgeDataDetails: fridgeDetails,
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export default LoadFridgeReceiptService;