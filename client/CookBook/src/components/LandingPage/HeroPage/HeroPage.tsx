import React from 'react'
import styled from 'styled-components'
import { Navbar } from '../Navbar/Navbar'

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  `

const Container = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  `
  function HeroPage() {
  return (
   <Section>
      <Navbar/>
      <Container>
        HeroPage
      </Container>
   </Section>
  )
}

export default HeroPage