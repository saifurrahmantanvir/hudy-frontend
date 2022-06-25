import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useUser from '../hooks/useUser';

const PrivateRoute = ({ children }) => {
   const location = useLocation()
   const { loading, isLoggedIn } = useUser()

   if (loading)
      return null

   return isLoggedIn
      ? children
      : <Navigate to='/login' state={{ from: location.pathname }} replace={true} />
}

export default PrivateRoute