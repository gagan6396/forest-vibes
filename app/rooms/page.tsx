import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import RoomsSection from './Roomssection'
import HotelBanner from './HotelBanner'

function page() {
  return (
    <>
    <Navbar/>
    <HotelBanner/>
    <RoomsSection/>
    <Footer/>
    </>
  )
}

export default page
