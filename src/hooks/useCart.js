import { useSelector } from 'react-redux';

const useCart = () => {
   const cart = useSelector((state) => state.cart)

   return cart
}

export default useCart