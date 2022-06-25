import React from 'react'
import { Link } from 'react-router-dom'
import '../sass/heroBanner.scss'

import Navbar from './Navbar'
import { Arrow } from '../icons'

const HeroBanner = () => {
   return (
      <div className="hero">
         <Navbar />

         <div className='hero__heading'>
            <h1>Shop your desire & feel the fashion</h1>
            <p>Everything you need in one central place</p>

            <Link to='/products' className="hero__cta">
               <span>Shop now</span>
               <Arrow />
            </Link>
         </div>

      </div>
   )
}

export default HeroBanner