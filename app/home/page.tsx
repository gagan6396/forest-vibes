import Navbar from '@/components/Navbar'
import React from 'react'
import HeroSection from './HeroSection'
import WelcomeSection from './WelcomeSection'
import HotelSections from './HotelSections'
import TestimonialsAndOffers from './TestimonialAndOffers'
import Footer from '@/components/Footer'
import LocationSection from './LocationSection'
import NearbyAttractions from './NearbyAttraction'
import PoolSection from './PoolSection'
import BannerVideo from './VideoSection'

function page() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <WelcomeSection/>
    <PoolSection/>
    <BannerVideo/>
    <HotelSections/>
    <LocationSection/>
    <NearbyAttractions/>
    <TestimonialsAndOffers/>
    <Footer/>
    </>
  )
}

export default page
