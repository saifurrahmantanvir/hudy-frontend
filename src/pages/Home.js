import React from 'react'
import '../sass/home.scss'

import { HeroBanner, ToggleButton } from '../components'
import { homeContent } from '../content'

import featured1 from '../images/featured-1.png'
import featured2 from '../images/featured-2.png'

const Home = () => {
   return (
      <div className="home">
         <HeroBanner />

         <div className="home__description">
            <h2>Innovative ways to decorate yourself</h2>
            <p>{homeContent.description}</p>
         </div>

         <ToggleButton />

         <figure className="home__featured--left">
            <img src={featured1} alt="featured1" />

         </figure>

         <div className="home__about">
            <h2>About our clothes</h2>
            <p>{homeContent.about}</p>
         </div>

         <figure className="home__featured--right">
            <img src={featured2} alt="featured2" />

         </figure>
      </div>
   )
}

export default Home