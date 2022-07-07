import React from 'react'
import { Link } from 'react-router-dom'
import '../sass/navbar.scss'

import { Cart, Hamburger } from '../icons'
import { useSelector } from 'react-redux'

const Navbar = ({ handleToggle }) => {
   const { quantity } = useSelector((state) => state.cart)

   return (
      <nav className='nav'>
         <span className='nav__logo'>Hudy.</span>

         <ul className='nav__list'>
            <li className='nav__item'>
               <Link to='/cart'><Cart /></Link>
               <span>{quantity}</span>
            </li>
            <li className='nav__item'>
               <button onClick={handleToggle}><Hamburger /></button>
            </li>
         </ul>
      </nav>
   )
}

export default Navbar