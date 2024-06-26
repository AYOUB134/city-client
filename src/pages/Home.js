import React from 'react'
import Nav from './Nav'
import HeroBox from '../features/herobox/HeroBox'
import Patients from '../features/patients/Patients'

const Home = () => {
  return (
    <div>
      <Nav/>
      <HeroBox/>
      <Patients></Patients>
    </div>
  )
}

export default Home
