import React from 'react'
import HeroSection from './HeroSection'
import WelcomeSection from './WelcomeSection'
import HotelSections from './HotelSections'
import TestimonialsAndOffers from './TestimonialAndOffers'
import LocationSection from './LocationSection'
import NearbyAttractions from './NearbyAttraction'
import PoolSection from './PoolSection'
import BannerVideo from './VideoSection'

function page() {
  return (
    <>
    <HeroSection/>
    <WelcomeSection/>
    <PoolSection/>
    <BannerVideo/>
    <HotelSections/>
    <LocationSection/>
    <NearbyAttractions/>
    <TestimonialsAndOffers/>
    </>
  )
}

export default page