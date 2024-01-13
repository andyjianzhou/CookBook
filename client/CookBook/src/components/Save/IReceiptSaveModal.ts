// ISaveModal.ts
export interface IReceiptSaveModal {
    receiptDetails: {
        store: string;
        products: Array<{
            product: string;
            brand: string | null;
            price: string;
        }>;
    };
    open: boolean;
    onClose: () => void;
    onSave: () => void;
}
