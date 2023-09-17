import React from 'react'
import styled from 'styled-components'
import HeroPage from './HeroPage/HeroPage'
import About from './About/About'
import AIComponent from './AIDemo/AIDemo'

const Container = styled.div`
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
  color: white;
  background:url('./img/e3c08d.png') no-repeat center center fixed;
  &::-webkit-scrollbar {
    display: none;
  }
`
export default function HomePages() {
  return (
    <Container>
      <HeroPage/>
      <About/>
      <AIComponent/>
    </Container>
  )
}
