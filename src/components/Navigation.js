import React from 'react'
import { Link } from 'react-router-dom'
import '../sass/navigation.scss'

import { useDispatch } from 'react-redux'
import { removeUser } from '../redux/userSlice'

const Navigation = ({ nav, handleToggle }) => {
   const dispatch = useDispatch()

   const handleLogout = () => {
      localStorage.removeItem('persist:hudy/user')

      dispatch(removeUser())
   }

   return (
      <nav className={`navigation ${nav ? 'navigation__open' : ''}`}>
         <ul className='navigation__list'>
            <li onClick={handleToggle}>
               <Link to='/products'>products</Link>
            </li>
            <li onClick={handleToggle}>
               <Link to='/admin'>admin</Link>
            </li>
            <li onClick={handleToggle}>
               <button onClick={handleLogout}>logout</button>
            </li>
         </ul>

         <button className='navigation__close' onClick={handleToggle}>
            &times;
         </button>
      </nav>
   )
}

export default Navigation