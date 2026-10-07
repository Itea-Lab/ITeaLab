import React from 'react'
import dynamic from 'next/dynamic'
import {Navbar} from './components/navbar'
import Hero from './components/hero'
import BottomLoadingBar from './components/ui/bottom-loading-bar'
const CustomCursor = dynamic(() => import('./components/ui/custom-cursor'))

const About = dynamic(() => import('./components/about').then(mod => mod.About))
const Community = dynamic(() => import('./components/what-we-do'))
const IteaLabSlider = dynamic(() => import('./components/decoration-1'))
const HowOurTeamWork = dynamic(() => import('./components/how-our-team-work'))
const JoinUs = dynamic(() => import('./components/join-us'))
const News = dynamic(() => import('./components/news'))
const Footer = dynamic(() => import('./components/footer'))

const home = () => {
  return (
    <div className='bg-background cursor-none'>
      <BottomLoadingBar />
      <CustomCursor/>
      <Navbar/>
      <Hero />
      <div className="content-auto">
        <About/>
        <Community />
        <IteaLabSlider/>
        <HowOurTeamWork/>
        <JoinUs/> 
        <News/>
        <Footer/>
      </div>
    </div>
  )
}

export default home