import React from 'react'
import { Link } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import '../sass/checkout.scss'

import useCart from '../hooks/useCart';
import useUser from '../hooks/useUser';

const stripePromise = loadStripe("pk_test_51LC7BNF1Os0hWe6B5FxAiQWfEZ2FRRM5RbGL39iojiuqYlUvu9ilxCDXVve1tcdlGoRAWkm5BMfcBit2b3Rrft8X00NbVMHT6Q");


const Checkout = ({ total }) => {
   const { isLoggedIn } = useUser()
   const cart = useCart()

   const localUser = JSON.parse(localStorage.getItem('persist:hudy/user'))

   const handleCheckout = async () => {
      try {
         const response = await fetch("https://hudy-tanvir.onrender.com/api/orders/checkout-session", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               'Authorization': `Bearer ${localUser?.token}`
            },
            body: JSON.stringify({ cart })
         })

         const json = await response.json()

         const stripe = await stripePromise;

         const { error } = await stripe.redirectToCheckout({
            sessionId: json.session.id
         })

         if (error) throw error
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <div className='checkout'>
         <h3 className='checkout__title'>Checkout</h3>

         <div className='checkout__shipping'>
            <span>Shipping cost</span>
            <span className='value'>
               50 <span className='doller'>$</span>
            </span>
         </div>

         <div className='checkout__discount'>
            <span>Discount</span>
            <span className='value'>
               50 <span className='doller'>$</span>
            </span>
         </div>

         <div className='checkout__price'>
            <span>Total</span>
            <span className='value'>
               {total} <span className='doller'>$</span>
            </span>
         </div>

         <span className={isLoggedIn ? 'hidden' : 'visible'}>
            Login to checkout! <Link to='/login' replace={true} state={{ from: '/cart' }}>Login</Link>
         </span>

         <button disabled={!isLoggedIn} className='cta'
            onClick={handleCheckout}
         >
            Checkout <span>{total}</span>$
         </button>
      </div>
   )
}

export default Checkout