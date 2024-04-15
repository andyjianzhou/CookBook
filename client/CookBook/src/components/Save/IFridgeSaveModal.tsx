export interface IFridgeSaveModal {
    fridgeDetails: {
        foods: string[];
    };
    updateFridgeDetails: (updatedFoods: string[]) => void;
    open: boolean;
    onClose: () => void;
    onSave: () => void;
    fridgeImg: string | undefined;
}
