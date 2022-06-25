import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
   name: 'cart',
   initialState: { products: [], quantity: 0, price: 0 },
   reducers: {
      addProduct: (state, action) => {
         const { id, price, quantity } = action.payload
         const readd = state.products.findIndex((product) =>
            product.id === id
         )

         if (readd >= 0) {
            state.products[readd].price += price;
            state.products[readd].quantity += quantity;
            state.price += price;
         }
         else {
            state.products.push(action.payload);
            state.quantity += 1;
            state.price += price;
         }
      },
      removeProduct: (state, action) => {
         const { id, price } = action.payload
         const index = state.products.indexOf((product) =>
            product.id === id
         )

         state.products.splice(index, 1)
         state.quantity -= 1;
         state.price -= price;
      }
   }
})

export default cartSlice.reducer
export const { addProduct, removeProduct } = cartSlice.actions