import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import AboutUs from './About-us'
import HotelLegacy from './HotelLegacy'
import HotelGallery from './HotelGallery'
import AmenitiesShowcase from './AmenetiesShowcase'

function page() {
  return (
   <>
   <Navbar/>
   <AboutUs/>
   <HotelLegacy/>
   <HotelGallery/>
   <AmenitiesShowcase/>
   <Footer/>
   </>
  )
}

export default page
