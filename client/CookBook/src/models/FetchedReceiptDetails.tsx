import ReceiptDetails from "./ReceiptDetails";

type FetchedReceiptDetails = ReceiptDetails & {
    receipt_id: string; 
    createdAt: string;
};

export default FetchedReceiptDetails;