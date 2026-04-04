import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import HeroSection from './HeroSection'
import ContactForm from './ContactForm'
import HotelFAQ from './FAQ'

function page() {
  return (
   <>
   <Navbar/>
   <HeroSection/>
   <ContactForm/>
   <HotelFAQ/>
   <Footer/>
   </>
  )
}

export default page
