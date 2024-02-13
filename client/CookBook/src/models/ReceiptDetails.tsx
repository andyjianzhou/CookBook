type Product = {
    product: string;
    brand: string | null;
    price: string;
};

type ReceiptDetails = {
    store: string;
    foods: string[];
    products: Product[];
};

export default ReceiptDetails;
