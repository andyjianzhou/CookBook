import React, { useState, useRef } from 'react';

const Camera = () => {
    const [image, setImage] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

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
    };

    return (
        <div style={{ position: 'relative' }}>
            <video ref={videoRef} autoPlay style={{ width: '100%', height: '100%' }} />
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
                    backgroundColor: 'transparent',
                    outline: 'none',
                    cursor: 'pointer',
                }}
                onClick={handleCapture}
            />
            {image && <img src={image} alt="captured" />}
        </div>
    );
};

export default Camera;
