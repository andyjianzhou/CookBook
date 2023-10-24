import React, { useRef, useEffect } from "react";

const Webcam = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            });
        }
    }, []);

    return <video ref={videoRef} autoPlay />;
};

export default Webcam;
