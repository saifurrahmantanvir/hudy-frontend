import React from 'react'
import { Link } from 'react-router-dom'
import '../sass/heroBanner.scss'

import Navbar from './Navbar'
import { Arrow } from '../icons'
import Navigation from './Navigation'

const HeroBanner = () => {
   const [nav, setNav] = React.useState(false)

   const handleToggle = () => {
      setNav(!nav)
   }

   return (
      <div className="hero">
         <Navigation nav={nav} handleToggle={handleToggle} />
         <Navbar handleToggle={handleToggle} />

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