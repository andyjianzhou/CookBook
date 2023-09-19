import React, { Suspense } from "react";
import styled from "styled-components";
import { Navbar } from "../Navbar/Navbar";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    height: 200vh;
  }
`;

const Container = styled.div`
  height: 100%;
  scroll-snap-align: center;
  width: 1400px;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  @media only screen and (max-width: 768px) {
    flex: 1;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 74px;
  position: relative;

  .scan {
    display: inline-flex;
    overflow: hidden;
    position: relative;

    span {
      display: inline-block;
      position: relative;
      transform-origin: bottom;
      overflow: hidden;
      color: transparent;
      background-clip: text;
      animation: revealText 0.5s forwards;
      animation-delay: calc(0.15s * var(--index));

      &::before {
        content: attr(data-char);
        position: absolute;
        top: 0;
        left: 0;
        color: #93E9BE; /* sea foam green */
        transform: translateY(100%);
        transition: transform 0.3s;
      }

      &:hover::before {
        transform: translateY(0);
      }
    }
  }

  @keyframes revealText {
    to {
      color: black; /* Adjust this to whatever the original color of the text should be */
    }
  }

  @media only screen and (max-width: 768px) {
    text-align: center;
  }
`;

const WhatWeDo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Line = styled.img`
  height: 5px;
`;

const Subtitle = styled.h2`
  color: #FFFF00;
`;

const Desc = styled.p`
  font-size: 24px;
  color: white;
  transition: transform 0.3s ease, color 0.3s ease; // smooth transition for transform and color
  transform: perspective(600px) translateZ(0); // adding perspective for 3D effect
  cursor: pointer; // to indicate to the user that it's hoverable

  &:hover {
    transform: perspective(600px) translateZ(20px); // popping effect
    color: #93E9BE; // Sea Foam Green
  }

  @media only screen and (max-width: 768px) {
    padding: 20px;
    text-align: center;
  }
`;


const Button = styled.button`
  background-color: #93E9BE;
  color: white;
  font-weight: 500;
  width: 100px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Right = styled.div`
  flex: 3;
  position: relative;
  @media only screen and (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

const Img = styled.img`
  width: 800px;
  height: 600px;
  object-fit: contain;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  animation: animate 2s infinite ease alternate;

  @media only screen and (max-width: 768px) {
    width: 300px;
    height: 300px;
  }

  @keyframes animate {
    to {
      transform: translateY(20px);
    }
  }
`;

const Hero = () => {
  return (
    <Section>
      <Navbar />
      <Container>
        <Left>
        <Title>
          Sizzle, Serve, 
          <span className="scan">
            <span data-char="S" data-index="0">S</span>
            <span data-char="c" data-index="1">c</span>
            <span data-char="a" data-index="2">a</span>
            <span data-char="n" data-index="3">n</span>
          </span>.
        </Title>
          <WhatWeDo>
            <Line src="./img/line.png" />
          </WhatWeDo>
          <Desc>
            With the power of AI, we can help you find the perfect recipe for your ingredients.
          </Desc>
          <Button>Learn More</Button>
        </Left>
        <Right>
          <Canvas>
            <Suspense fallback={null}>
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={1} />
              <directionalLight position={[3, 2, 1]} />
              <Sphere args={[1, 100, 200]} scale={2.4}>
                <MeshDistortMaterial
                  color="#FFFDD0"
                  attach="material"
                  distort={0.5}
                  speed={2}
                />
              </Sphere>
            </Suspense>
          </Canvas>
          {/* <Img src="./img/moon.png" /> */}
        </Right>
      </Container>
    </Section>
  );
};

export default Hero;