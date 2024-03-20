import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../../utils/cartUtils';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cart_Array: [], shippingAddress: {}, paymentMethod: 'Razorpay' };


 export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    items_Add_To_Cart:(state,action)=>{
      const { user, rating, numReviews, reviews, ...item } = action.payload;

      const existItem = state.cart_Array.find((x) => x._id === item._id);

      if (existItem) {
        state.cart_Array = state.cart_Array.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cart_Array = [...state.cart_Array, item];
      }

      return updateCart(state,item)
    },
   
    items_Remove_To_Cart:(state,action)=>{
        state.cart_Array = state.cart_Array.filter((item)=>item._id !== action.payload);
        return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },

    clearCartItems: (state, action) => {
      state.cart_Array = [];
      localStorage.setItem('cart', JSON.stringify(state));
    },

    resetCart: (state) => (state = initialState),
  },

 
})

export const { items_Add_To_Cart, items_Remove_To_Cart,saveShippingAddress,savePaymentMethod,clearCartItems,resetCart } = cartSlice.actions;
export default cartSlice.reducer;
 