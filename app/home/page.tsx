import Navbar from '@/components/Navbar'
import React from 'react'
import HeroSection from './HeroSection'
import WelcomeSection from './WelcomeSection'
import HotelSections from './HotelSections'
import TestimonialsAndOffers from './TestimonialAndOffers'
import Footer from '@/components/Footer'

function page() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <WelcomeSection/>
    <HotelSections/>
    <TestimonialsAndOffers/>
    <Footer/>
    </>
  )
}

export default page
