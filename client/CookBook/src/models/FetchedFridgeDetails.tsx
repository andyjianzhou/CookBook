import FridgeDetails from "./FridgeDetails";

type FetchedFridgeDetails = FridgeDetails & {
    fridge_id: string; 
    createdAt: string;
};

export default FetchedFridgeDetails;
