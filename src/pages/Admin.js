import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../sass/admin.scss'

import { Sample } from '../components'
import useUser from '../hooks/useUser'

const initialFormData = {
   name: '',
   price: 1,
   inStock: 1,
   brand: '',
   size: [],
   tags: [],
   description: ''
}

const Admin = () => {
   const { user } = useUser()

   const { token } = JSON.parse(localStorage.getItem('persist:hudy/user'))

   const [formData, setFormData] = React.useState({ ...initialFormData })
   const [product, setProduct] = React.useState({})

   const handleChange = (e) => {
      const value = e.target.value.split(',')

      setFormData({
         ...formData,
         [e.target.name]: value
      })
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      try {
         const form = new FormData()
         const fields = ['size', 'tags']

         Object.entries(formData).forEach(([key, value]) => {
            if (fields.includes(key)) {
               form.append(key, JSON.stringify(value))
            }
            else {
               form.append(key, value)
            }
         })

         form.append('image', e.target.elements.image.files[0])

         const response = await axios({
            method: 'POST',
            url: 'https://hudy-tanvir.herokuapp.com/api/products',
            headers: {
               'Authorization': `Bearer ${token}`
            },
            data: form
         })

         response.data.status === 'success' &&
            setProduct(response.data.data.product)

      } catch (error) {
         console.log(error)
      }
   }

   if (!user.isAdmin) {
      return (
         <section className='admin'>
            <div className='admin__not'>
               <h3>Only admin can access this route!</h3>
               <Link to='/'>GO HOME</Link>
            </div>
         </section>
      )
   }

   return (
      <section className='admin'>
         <h2 className='admin__title'>Upload a new product</h2>

         <form className='admin__form' onSubmit={handleSubmit}>
            <input name='name' className='admin__name'
               value={formData.name} placeholder='product name' type='text'
               onChange={(e) => setFormData({
                  ...formData, name: e.target.value
               })} />

            <input name='price' className='admin__price'
               value={formData.price} placeholder='price' type='number'
               onChange={(e) => setFormData({
                  ...formData, price: e.target.value
               })} />

            <input name='instock' className='admin__instock'
               placeholder='instock' type='number' value={formData.inStock}
               onChange={(e) => setFormData({
                  ...formData, inStock: e.target.value
               })} />

            <input name='brand' className='admin__brand'
               placeholder='brand' type='text' value={formData.brand}
               onChange={(e) => setFormData({
                  ...formData, brand: e.target.value
               })} />

            <textarea name='description' className='admin__description'
               placeholder='product description' value={formData.description}
               onChange={(e) => setFormData({
                  ...formData, description: e.target.value
               })} />

            <input name='size' className='admin__size'
               placeholder='size(s)' type='text' value={formData.size}
               onChange={handleChange} />

            <input name='tags' className='admin__tags'
               placeholder='tags' type='text' value={formData.tags}
               onChange={handleChange} />

            <div className='admin__image'>
               <input name='image' type='file' accept='image/*'
                  multiple={false} />
            </div>

            <button className='cta'>Upload</button>
         </form>

         {product.name && (<Sample product={product} />)}
      </section>
   )
}

export default Admin