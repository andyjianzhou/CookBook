import React, { useEffect, useRef, useState } from 'react';

interface WebcamProps {
    width?: number;
    height?: number;
    isVideoPlaying?: boolean;
}

const Webcam: React.FC<WebcamProps> = ({ width, height, isVideoPlaying = true }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    const stopStream = () => {
        if (stream) {
            let tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            setStream(null);
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        }
    };

    useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            if (isVideoPlaying) {
                navigator.mediaDevices.getUserMedia({ video: true }).then((newStream) => {
                    setStream(newStream);
                    if (videoRef.current) {
                        videoRef.current.srcObject = newStream;
                    }
                });
            } else {
                stopStream();
            }
        }

        return stopStream; // This will ensure the stream is stopped when the component is unmounted
    }, [isVideoPlaying]);

    return <video ref={videoRef} width={width} height={height} autoPlay />;
};

export default Webcam;
