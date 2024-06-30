import React from 'react'
import Nav from './Nav'
import HeroBox from '../features/herobox/HeroBox'
import Patients from '../features/patients/Patients'
// import Doctors from '../features/doctors/Doctors'


const Home = () => {
  return (
    <div>
      <Nav/>
      <HeroBox/>
      {/* <Doctors></Doctors> */}
      <Patients></Patients>
    </div>
  )
}

export default Home
