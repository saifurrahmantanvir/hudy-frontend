import React from 'react'
import '../sass/products.scss'

import { ProductCard } from '../components'

/* const localCache = {} */

const sizes = [
   { value: '', label: 'Size' }, { value: 'L', label: 'L' },
   { value: 'XL', label: 'XL' }, { value: 'M', label: 'M' }, { value: 'XXL', label: 'XXL' }
]

const sorts = [
   { value: '', label: 'Sort' }, { value: 'createdAt', label: 'Latest' },
   { value: 'price', label: 'Low to High' }, { value: '-price', label: 'High to Low' }
]

const Products = () => {
   const [status, setStatus] = React.useState('Loading. Please Wait!')
   const [sort, setSort] = React.useState('')
   const [size, setSize] = React.useState('')
   const [products, setProducts] = React.useState([])

   const getProducts = async (sort, size) => {
      try {
         /*
         if (localCache['products']) {
            setProducts(localCache['products'])
            setStatus('')
         } else {
         */
         const filter = size ? `&size=${size}` : '';

         const response = await fetch(`https://hudy-tanvir.herokuapp.com/api/products?fields=name,slug,price,image&sort=${sort}${filter}`)

         const json = await response.json()

         if (json.status === 'success') {
            setTimeout(() => {
               /* localCache['products'] = json.data.products; */

               setProducts(json.data.products)
               setStatus('')
            }, 1000)
         }

      } catch (error) {
         setStatus('Failed to load data!')
      }
   }

   React.useEffect(() => {
      getProducts(sort, size)

   }, [size, sort])

   const handleSize = (e) => setSize(e.target.value)
   const handleSort = (e) => setSort(e.target.value)

   return (
      <div className='products'>
         <div className='products__nav'>
            <h2 className='products__title'>PRODUCTS</h2>

            <div className='products__filter'>
               <select value={size} onChange={handleSize} onBlur={handleSize}>
                  {sizes.map(({ value, label }) => (
                     <option value={value} key={label}>{label}</option>
                  ))}
               </select>

               <select value={sort} onChange={handleSort} onBlur={handleSort}
               >
                  {sorts.map(({ value, label }) => (
                     <option value={value} key={label}>{label}</option>
                  ))}
               </select>
            </div>
         </div>

         <div className='products__container'>
            {status ? (<h3 className='products__loading'>{status}</h3>)
               : products.map((product) => (
                  <ProductCard product={product} key={product.name} />)
               )}
         </div>
      </div>
   )
}

export default Products