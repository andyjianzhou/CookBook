import React, { Suspense, useState, useEffect } from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Banana } from "../3DModels/Banana";

const CanvasContainer = styled.div`
  position: absolute;  
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

const FruitDisplay = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [floatValue, setFloatValue] = useState(0);

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    const animate = () => {
      setFloatValue(prev => Math.sin(Date.now() / 2000) * 0.5);
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', updateViewport);
    animate();

    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const positions = isMobile ? [
    [-4, 4, -2],
    [1, 6, -4],
    [-3, 2, -6],
    [4, 4, -8],
    [-3, -4, -7],
  ] : [
    [-9, 4, -2],
    [-1, 7, -4],
    [-5, 1, -6],
    [16, 5, -10],
    [-6, -6, -7],
  ];

  return (
    <CanvasContainer>
      <Canvas>
        <PerspectiveCamera position={[0, 0, 10]} />
        <ambientLight intensity={1} />
        <directionalLight position={[1, 2, 3]} intensity={1} />
        
        <Suspense fallback={null}>
          {/* Scattered Bananas */}
          {positions.map((pos, idx) => (
            <Banana key={idx} position={[pos[0], pos[1] + floatValue, pos[2]]} rotation={[0, 0.5, 0]} />
          ))}
        </Suspense>
      </Canvas>
    </CanvasContainer>
  );
};

export default FruitDisplay;
