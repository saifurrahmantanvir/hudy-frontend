import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.scss';

import { Home, Admin, Login, NoMatch, Product, Products, Cart } from './pages'
import { CartCancel, CartSuccess, PrivateRoute } from './components';

import store from './redux/store';
import { getUser } from './redux/userSlice';

const AppWithContexts = () => {
   const dispatch = useDispatch()

   React.useLayoutEffect(() => {
      const user = JSON.parse(localStorage.getItem('persist:hudy/user'))

      dispatch(getUser(user?.user))
   }, [dispatch])

   return (
      <div className="App">
         <BrowserRouter>
            <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/login' element={<Login />} />
               <Route path='/admin' element={<Admin />} />
               <Route path='/products' element={
                  <PrivateRoute><Products /></PrivateRoute>
               } />
               <Route path='/cart' element={<Cart />}>
                  <Route path='success' element={<CartSuccess />} />
                  <Route path='cancel' element={<CartCancel />} />
               </Route>
               <Route path='/products/:slug' element={<Product />} />
               <Route path='*' element={<NoMatch />} />
            </Routes>
         </BrowserRouter>
      </div>
   )
}

const App = () => {
   return (
      /* <AnimateSharedLayout type="crossfade"> */
      <Provider store={store}>
         <AppWithContexts />
      </Provider>
      /* </AnimateSharedLayout> */
   )
}

export default App;