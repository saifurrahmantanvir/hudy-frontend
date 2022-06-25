import React from 'react'
import { Link } from 'react-router-dom'
import '../sass/productCard.scss'

const ProductCard = ({ product }) => {
   return (
      <Link to={`/products/${product.slug}`}>
         <div className='card'>
            <figure>
               <img src={product.image} alt={product.slug} />
            </figure>

            <div className='card__info'>
               <h6>{product.name}</h6>
               <span>
                  {product.price} <span className='doller'>$</span>
               </span>
            </div>
         </div>
      </Link>
   )
}

export default ProductCard