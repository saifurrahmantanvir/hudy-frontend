import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import useUser from '../hooks/useUser'
import '../sass/review.scss'

const initialStatus = { type: '', message: '' }

const Review = ({ reviews, id, slug }) => {
   const { user } = useUser()
   const [review, setReview] = React.useState({})
   const [status, setStatus] = React.useState(initialStatus)

   const localUser = JSON.parse(localStorage.getItem('persist:hudy/user'))

   const handleReview = async (e) => {
      e.preventDefault()

      try {
         if (user._id) {
            const { review: { value: review } } = e.target.elements

            if (!review) throw new Error('Empty review can\'t be submitted!')

            const response = await fetch('https://hudy-tanvir.herokuapp.com/api/reviews', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localUser?.token}`
               },
               body: JSON.stringify({
                  user: user._id,
                  product: id,
                  review
               })
            })

            const { status, ...data } = await response.json()
            if (status === 'fail') throw data

            setReview(data.data.review)
            setStatus(initialStatus)

            e.target.elements.review.value = ''
         }
         else {
            setStatus({
               type: 'login',
               message: 'Login to review this product!'
            })
         }
      } catch ({ message }) {
         setStatus({ type: 'random', message })
      }
   }

   React.useEffect(() => {
      setReview({})
      setStatus(initialStatus)

   }, [id])

   return (
      <div className='review'>
         <h2 className='title'>REVIEWS</h2>

         <form className='review__form' onSubmit={handleReview}>
            <input type='text' id='review' className='review__input'
               placeholder='Leave a review' />
            <button type='submit' className='review__button'>
               Review
            </button>
         </form>

         {status.type && (
            <div className='review__status'>
               <span>{status.message}</span>
               {status.type === 'login' && (
                  <Link to='/login' replace={true} state={{ from: `/products/${slug}` }}>Login</Link>
               )}
            </div>
         )}

         <div className='review__list'>
            {review?.review && (
               <div className='review__item'>
                  <h4 className='review__author'>{user.name}</h4>
                  <p className='review__date'>
                     {moment(review.createdAt).utc().format('MMM DD YYYY, HH:mm A')}
                  </p>
                  <p className='review__text'>{review.review}</p>
               </div>
            )}

            {!reviews.length && !review.review && (
               <span className='review__status'>No reviews yet! Be the first one to review this product.</span>
            )}

            {!reviews.length ? null : reviews.map(({ id, user, review, createdAt }) => (
               <div className='review__item' key={id}>
                  <h4 className='review__author'>{user.name}</h4>
                  <p className='review__date'>
                     {moment(createdAt).utc().format('MMM DD YYYY, HH:mm A')}
                  </p>
                  <p className='review__text'>{review}</p>
               </div>
            ))}
         </div>

      </div>
   )
}

export default Review