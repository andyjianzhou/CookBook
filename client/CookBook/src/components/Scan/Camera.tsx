import React, { useState, useRef, useEffect } from 'react';

const Camera = () => {
    const [image, setImage] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

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

        getMedia();
    }, []);

    const handleCapture = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
      
        if (!canvas || !video) {
            return;
        }
      
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      
        const ctx = canvas.getContext('2d');
      
        if (!ctx) {
            return;
        }
      
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
        const dataURL = canvas.toDataURL('image/png');
        setImage(dataURL);
      
        // Stop all video streams
        if (video.srcObject) {
          (video.srcObject as MediaStream).getTracks().forEach(track => track.stop());
        }
      };
      

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%' }} />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
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
                    backgroundColor: '#ff4081', // You can choose a better color
                    color: 'white',
                    fontSize: '24px', // Adjust as necessary
                    outline: 'none',
                    cursor: 'pointer',
                }}
                onClick={handleCapture}
            >
            </button>
            {image && <img src={image} alt="Captured" style={{ position: 'absolute', top: '10px', left: '10px', maxWidth: '200px', maxHeight: '200px', border: '3px solid white' }} />}
        </div>
    );
};

export default Camera;
