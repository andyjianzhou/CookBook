import React, { useState, useRef, useEffect } from 'react';
import CapturedImage from './CapturedImage';

// // TODO: https://github.com/mrousavy/react-native-vision-camera, this is for react native

const Camera = () => {
    const [image, setImage] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isCameraActive, setIsCameraActive] = useState(true); // State to manage camera status

    useEffect(() => {
        // Access the user's webcam
        const getMedia = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (isCameraActive) {
            getMedia();
        }

        return () => { // Clean up function to stop the video stream
            const tracks = (videoRef.current?.srcObject as MediaStream)?.getVideoTracks();
            tracks?.forEach((track) => track.stop());
        };
    }, [isCameraActive]);  

    const handleCapture = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
      
        if (canvas && video) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataURL = canvas.toDataURL('image/png');
                setImage(dataURL); // Save captured image
                setIsCameraActive(false); // Turn off camera after capturing image
            }
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {isCameraActive && (
                <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%' }} />
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {!image && ( // Only show capture button if an image hasn't been captured
                <button
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        border: '2px solid white',
                        backgroundColor: '#ff4081',
                        color: 'white',
                        fontSize: '24px',
                        outline: 'none',
                        cursor: 'pointer',
                    }}
                    onClick={handleCapture}
                />
            )}
            {/* Add image edit component */}
            {image && (
               <CapturedImage image={image} />
            )}
        </div>
    );
};

export default Camera;
