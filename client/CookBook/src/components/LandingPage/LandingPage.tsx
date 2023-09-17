import React from 'react'
import ThreeDPie from './ThreeDPie'

function LandingPage() {
  return (
    <div>
      <ThreeDPie
        data={[
          { value: 40, color: 'red' },
          { value: 30, color: 'blue' },
          { value: 20, color: 'green' },
          { value: 10, color: 'yellow' },
        ]}
      />
    </div>
  )
}

export default LandingPage