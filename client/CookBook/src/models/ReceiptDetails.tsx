type Product = {
    product: string;
    brand: string | null;
    price: string;
};

type ReceiptDetails = {
    store: string;
    products: Product[];
};

export default ReceiptDetails;
