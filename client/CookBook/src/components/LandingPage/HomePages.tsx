import React, { Suspense } from "react";
import styled from 'styled-components'
import HeroPage from './HeroPage/HeroPage'
import About from './About/About'
import AIComponent from './AIDemo/AIDemo'
import FruitDisplay from "./3DModels/FruitDisplay";
import Splash from './SplashPage/Splash'

const Container = styled.div`
  position: relative; // Add relative positioning for the absolute positioning of FruitDisplay
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
  color: white;
  background: url('./img/e3c08d.png') no-repeat center center fixed;

  &::-webkit-scrollbar {
    display: none;
  }
`
export default function HomePages() {
  return (
    <>
      <Splash/>
      <Container>
        <FruitDisplay />
        <HeroPage />
        <About />
        <AIComponent />
      </Container>
    </>
  );
}
