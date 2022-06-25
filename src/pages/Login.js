import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import '../sass/login.scss'

import ShoppingSvg from '../icons/ShoppingSvg'
import { fetchUser, setError } from '../redux/userSlice';
import useUser from '../hooks/useUser';

const Login = function () {
   const { state } = useLocation()
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const user = useUser()

   const handleLogin = (e) => {
      e.preventDefault()

      const { email: { value: email }, pass: { value: password } } = e.target.elements

      if (!email || !password) {
         return dispatch(setError('Empty email or password'))
      }

      dispatch(fetchUser({ email, password }))
   }

   React.useEffect(() => {
      if (user.isLoggedIn) {
         navigate(state?.from || '/', { replace: true })
      }

   }, [state?.from, navigate, user.isLoggedIn])

   return (
      <div className='form-container'>
         <div className='login'>
            <div className='login__logo'>hudy.</div>
            <h2 className='login__title'>Login & start shopping now!</h2>

            <form className='login__form' onSubmit={handleLogin}>
               <div className='login__email'>
                  <label htmlFor='email' className='login__label'>Email</label>
                  <input className='login__input' id='email'
                     placeholder="hello@tanvir.io"
                     defaultValue='hi@tanvir.io' />
               </div>

               <div className='login__pass'>
                  <label htmlFor='pass' className='login__label'>Password</label>
                  <input className='login__input' id='pass'
                     placeholder="******"
                     defaultValue='password' />
               </div>

               <div className='login__submission'>
                  <button className='login__submit cta'>Login</button>
                  {
                     user.error && (
                        <h4 className='login__error'>{user.error}</h4>
                     )
                  }
               </div>
            </form>

            <ShoppingSvg />
         </div>
      </div>
   )
}

export default Login