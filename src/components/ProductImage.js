import React from 'react'
import '../sass/productImage.scss'

const ProductImage = ({ imgSrc }) => {
   return (
      <figure className='product-img'>
         <img src={imgSrc} alt={imgSrc} />
      </figure>
   )
}

export default ProductImage