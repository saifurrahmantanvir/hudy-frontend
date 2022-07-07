/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import '../sass/product.scss'

import { Navbar, RelatedProducts, Review, ProductImage, Navigation } from '../components'
import { Down, Star, Up } from '../icons'
import { addProduct } from '../redux/cartSlice'

const Product = () => {
   const { slug } = useParams()
   const tag = slug.split('\'')[0].toLowerCase()

   const dispatch = useDispatch()

   const [status, setStatus] = React.useState('Loading. Please Wait!')
   const [quantity, setQuantity] = React.useState(1)
   const [size, setSize] = React.useState('')
   const [relatedProducts, setRelatedProducts] = React.useState([])
   const [product, setProduct] = React.useState({})
   const [nav, setNav] = React.useState(false)

   const handleToggle = () => {
      setNav(!nav)
   }

   const getProduct = React.useCallback(async () => {
      try {
         const productPromise = fetch(`https://hudy-tanvir.herokuapp.com/api/products/${slug}`)

         const relProductsPromise = fetch(`https://hudy-tanvir.herokuapp.com/api/products?tags=${tag}&fields=name,slug,price,image`)

         const [productJson, relProductsJson] = await Promise.all([
            productPromise,
            relProductsPromise
         ])

         const [product, relProducts] = await Promise.all([
            productJson.json(),
            relProductsJson.json()
         ])

         if (product.status === 'success') {
            const { data } = product;

            setTimeout(() => {
               setProduct(data.product)
               setRelatedProducts(relProducts.data.products)

               setSize(data.product.size[0])

               setStatus('')
            }, 1000)
         }
      } catch (error) {
         setStatus('Failed to load data!')
      }
   }, [product, slug])

   React.useEffect(() => {
      getProduct()

   }, [slug])

   const handleSize = (e) => {
      const size = e.target.closest('li')
      if (!size) return

      const sizes = Array.from(size.parentNode.children)
      sizes.forEach((size) => {
         size.classList.remove('product__size--active')
      })

      size.classList.add('product__size--active')
      setSize(size.textContent)
   }

   const handleCart = () => {
      const { name, slug, id, image, price } = product

      dispatch(addProduct({ name, slug, _id: id, id: `${size}${id.toUpperCase()}`, image, price: price * quantity, quantity, size }))
   }

   if (status) {
      return (
         <div className='product__loading'><h3>{status}</h3></div>
      )
   }

   return (
      <div className='product__container'>
         <div className='product'>
            <ProductImage imgSrc={product.image} slug={slug} />

            <div className='product__details'>
               <div>
                  <Navigation nav={nav} handleToggle={handleToggle} />
                  <Navbar handleToggle={handleToggle} />

                  <div className='product__heading'>
                     <h1 className='product__title'>{product.name}</h1>

                     <div className='product__rating'>
                        <span className='label'>rating</span>
                        <span className='value'>{product.rating || 4.5}</span>
                        <Star />
                     </div>
                  </div>

                  <div className='product__cta'>
                     <button disabled className='cta'>Buy now</button>

                     <span className='product__price'>{product.price}<span className='doller'>$</span></span>

                     <span className='product__note'>
                        Note- You can't order a product directly. Please add to cart first then order. Thank you!
                     </span>
                  </div>

                  <p className='product__description'>{product.description}</p>

                  <div className='product__status'>
                     <div className='product__status--instock'>
                        <span className='label'>Instock</span>
                        <span className='value'>{product.inStock}</span>
                     </div>

                     <div className='product__status--size'>
                        <span className='label'>Size</span>
                        <ul className='product__size' onClick={handleSize}>{product.size?.map((s, i) => (
                           <li key={s} className={i === 0 ? 'product__size--active' : ''}>{s}</li>
                        ))}
                        </ul>
                     </div>
                  </div>

                  <div className='product__atc'>
                     <button className='cta' onClick={handleCart}>
                        Add to cart
                     </button>

                     <div className='product__quantity'>
                        <button onClick={() => {
                           if (quantity > 1)
                              setQuantity((q) => q - 1)
                        }}>
                           <Down />
                        </button>
                        <input type='text' value={quantity} readOnly />
                        <button onClick={() => {
                           if (quantity < product.inStock)
                              setQuantity((q) => q + 1)
                        }}>
                           <Up />
                        </button>
                     </div>
                  </div>

                  <RelatedProducts products={relatedProducts} />
                  <Review reviews={product.reviews} id={product._id}
                     slug={slug} />
               </div>
            </div>

         </div>
      </div>
   )
}

export default Product