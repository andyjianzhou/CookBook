export interface IFoodCameraSaveModal {
    open: boolean;
    onClose: () => void;
    onSave: () => void;
    foodImg: string | undefined;
}