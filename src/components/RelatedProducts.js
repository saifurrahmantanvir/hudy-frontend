/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import '../sass/relatedProducts.scss'

import { Export } from '../icons'

const RelatedProducts = ({ products }) => {
   const [width, setWidth] = React.useState(0);
   const carousel = React.useRef();

   React.useEffect(() => {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);

   }, [])

   return (
      <div className='rel-product'>
         <h2 className='title'>RELATED PRODUCTS</h2>

         <motion.div className='rel-product__container'
            ref={carousel}
            whileTap={{ cursor: 'grabbing' }}
         >
            <motion.div className='rel-product__links'
               drag="x"
               dragConstraints={{ right: 0, left: -width }}
            >
               {products?.map((product) => (
                  <div className='rel-product__link' key={product.slug}>
                     <figure>
                        <img src={product.image} alt={product.slug} className='rel-product__img' />
                     </figure>
                     <div className='rel-product__info'>
                        <h6>{product.name}</h6>
                        <span>{product.price}<span className='doller'>$</span></span>
                     </div>

                     <Link to={`/products/${product.slug}`}>
                        <Export />
                     </Link>
                  </div>
               ))}
            </motion.div>
         </motion.div>

      </div>
   )
}

export default RelatedProducts