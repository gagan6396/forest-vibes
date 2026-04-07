import Navbar from '@/components/Navbar'
import React from 'react'
import HeroSection from './HeroSection'
import WelcomeSection from './WelcomeSection'
import HotelSections from './HotelSections'
import TestimonialsAndOffers from './TestimonialAndOffers'
import Footer from '@/components/Footer'
import LocationSection from './LocationSection'
import NearbyAttractions from './NearbyAttraction'

function page() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <WelcomeSection/>
    <HotelSections/>
    <LocationSection/>
    <NearbyAttractions/>
    <TestimonialsAndOffers/>
    <Footer/>
    </>
  )
}

export default page
