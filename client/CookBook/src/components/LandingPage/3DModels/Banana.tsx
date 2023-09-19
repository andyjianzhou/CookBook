import React, { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';
import { useSpring, animated } from '@react-spring/three';

interface BananaProps {
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
  [key: string]: any;
}

export function Banana(props: BananaProps) {
  const { nodes, materials } = useGLTF('./banana-transformed.glb') as any;
  
  // We'll use the position prop to determine the end position and start from the bottom
  const [endPosition] = useState(props.position || [0, 0, 0]);
  
  const { position } = useSpring({
    from: { position: [endPosition[0], endPosition[1] - 10, endPosition[2]] }, // start from 10 units below
    to: { position: endPosition },
    delay: 200,  // Optional: delay before the animation starts
    config: { mass: 5, tension: 400, friction: 50 }  // Physics parameters to tweak the "spring" feel
  });

  return (
    <animated.group position={position as any} dispose={null}>
      <mesh geometry={nodes.Banana_Banana_0.geometry} material={materials.Banana} scale={0.1} />
    </animated.group>
  );
}

useGLTF.preload('/banana-transformed.glb');
