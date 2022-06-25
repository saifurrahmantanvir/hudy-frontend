import React from 'react'
import '../sass/sample.scss'

const Sample = ({ product }) => {
   return (
      <div className='sample'>
         <h2 className='sample__title'>Product uploaded successfully</h2>

         <figure className='sample__image'>
            <img src={product.image} alt={product.image} />
         </figure>

         <h3 className='sample__name'>{product.name}</h3>
         <span className='sample__price'>
            {product.price}<span className='doller'>$</span>
         </span>

         <p className='sample__description'>{product.description}</p>
      </div>
   )
}

export default Sample