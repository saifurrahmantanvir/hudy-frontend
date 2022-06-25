import React from 'react'
import { Link } from 'react-router-dom'
import '../sass/noMatch.scss'

const NoMatch = () => {
   return (
      <div className='no-match'>
         <span>404</span>
         <h3>Page Not Found</h3>
         <Link to='/'>Go Home</Link>
      </div>
   )
}

export default NoMatch