import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../sass/cart.scss'

import { CartItem, Checkout } from '../components'
import useCart from '../hooks/useCart'

const Cart = () => {
   const { products, price } = useCart()

   return (
      <div className='cart'>
         <h2 className='cart__title'>YOUR CART</h2>

         <Outlet />

         {!products.length ? (
            <div className='cart__status'><h3>Your cart is empty!</h3><Link to='/products'>Shop Now</Link></div>
         ) : (
            <React.Fragment>
               <div className='cart__list'>
                  {
                     products.map((product, i) => (
                        <CartItem product={product} key={product.id} />
                     ))
                  }
               </div>

               <Checkout total={price} />
            </React.Fragment>
         )}
      </div>
   )
}

export default Cart