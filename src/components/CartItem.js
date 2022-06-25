import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import '../sass/cartItem.scss'

import { Delete } from '../icons'
import { removeProduct } from '../redux/cartSlice'

const CartItem = ({ product }) => {
   const dispatch = useDispatch()

   const handleCart = (id) => {
      const { price, quantity } = product

      dispatch(removeProduct({ id, price: price * quantity }))
   }

   return (
      <Link to={`/products/${product.slug}`}>
         <div className='cart-item'>
            <figure>
               <img src={product.image} alt={product.slug} />
            </figure>

            <div className='cart-item__info'>
               <h4>{product.name}</h4>

               <span>Quantity <span className='value'>
                  {product.quantity}
               </span></span>

               <span>Size <span className='value'>
                  {product.size}
               </span></span>
            </div>

            <div className='cart-item__cta'>
               <button className='cart-item__delete'
                  onClick={() => handleCart(product.id)}
               >
                  <Delete />
               </button>
               <span>
                  {product.price} <span className='doller'>$</span>
               </span>
            </div>
         </div>
      </Link>
   )
}

export default CartItem