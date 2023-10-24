interface CameraProps {
    onPictureTaken: (picture: string) => void;
    onPictureError: (error: string) => void;
    onVideoStart: () => void;
    onVIdeoStop: () => void;
    }
