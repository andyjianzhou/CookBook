import React from 'react';
import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';

interface BananaProps {
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
  [key: string]: any; // for other properties you might want to set on the group
}

export function Banana(props: BananaProps) {
  const { nodes: nodes1, materials } = useGLTF('./banana-transformed.glb') as any;
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes1.Banana_Banana_0.geometry} material={materials.Banana} scale={0.1} />
    </group>
  );
}

useGLTF.preload('/banana-transformed.glb');
