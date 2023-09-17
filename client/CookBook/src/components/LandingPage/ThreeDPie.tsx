import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface PieSegment {
  value: number;
  color: string;
}

interface ThreeDPieProps {
  data: PieSegment[];
  size?: number;
}

const ThreeDPie: React.FC<ThreeDPieProps> = ({ data, size = 300 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, size / size, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(size, size);
    containerRef.current.appendChild(renderer.domElement);

    const radius = size / 4;
    const depth = 30;
    let angleOffset = 0;

    data.forEach(segment => {
      const geometry = new THREE.CylinderGeometry(radius, radius, depth, 100, 1, true,
        angleOffset, (2 * Math.PI * segment.value) / 100);

      const material = new THREE.MeshBasicMaterial({ color: segment.color, side: THREE.DoubleSide });
      const pieSegment = new THREE.Mesh(geometry, material);
      
      scene.add(pieSegment);

      angleOffset += (2 * Math.PI * segment.value) / 100;
    });

    camera.position.z = radius * 2;

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the entire scene
      scene.rotation.x += 0.005;
      scene.rotation.y += 0.005;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Cleanup
      renderer.dispose();
      data.forEach(() => {
        // You can also add more cleanup logic for materials, geometries, etc.
      });
    };

  }, [data, size]);

  return <div ref={containerRef}></div>;
};

export default ThreeDPie;
