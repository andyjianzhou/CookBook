import React, { useState, useEffect, Suspense } from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Banana } from "../3DModels/Banana";
import { useSpring, a } from "@react-spring/three";

const CanvasContainer = styled.div`
  position: absolute;  
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

const FruitDisplay = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [displayBananas, setDisplayBananas] = useState<number[][]>([]);

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', updateViewport);

    const bananas = isMobile ? [
      [-4, 4, -2],
      [1, 7, -4],
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

    bananas.forEach((banana, index) => {
      setTimeout(() => {
        setDisplayBananas(prevBananas => [...prevBananas, banana]);
      }, index * 200);  // 200ms delay between each banana
    });

    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const springProps = useSpring({
    from: { y: 0 },
    to: async (next) => {
      while (1) {
        await next({ y: 0.5 });
        await next({ y: -0.5 });
      }
    },
    config: { duration: 2000 },
  });

  return (
    <CanvasContainer>
      <Canvas>
        <PerspectiveCamera position={[0, 0, 10]} />
        <ambientLight intensity={1} />
        <directionalLight position={[1, 2, 3]} intensity={1} />
        <Suspense fallback={null}>
          {displayBananas.map((pos, idx) => (
            <a.group key={idx} position-y={springProps.y.to(val => val + pos[1])}>
              <Banana position={[pos[0], 0, pos[2]]} rotation={[0, 0.7, 0]} />
            </a.group>
          ))}
        </Suspense>
      </Canvas>
    </CanvasContainer>
  );
};

export default FruitDisplay;
