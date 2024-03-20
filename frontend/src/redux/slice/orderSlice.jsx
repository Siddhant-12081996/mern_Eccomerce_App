import { createSlice } from '@reduxjs/toolkit'
import { createOrder, get_user_order_details, user_all_order } from '../thunk/orderThunk';


const initialState = {
  isLoading: false, 
  error: null, 
  success: false, 
  orders: [],
  orders_details:{},
  currentOrder: null,
  totalOrders: 0
}

 export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },

  extraReducers: (builder) => {

   //PLACE ORDER
    builder
    .addCase(createOrder.pending, state => {
      state.isLoading = true;
        state.error = null;
    })
     .addCase(createOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true; 
      state.orders.push(action.payload);  
      state.currentOrder = action.payload;   
    })
    .addCase(createOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;     
    })

//USER ALL ORDER
    .addCase(user_all_order.pending, state => {
      state.isLoading = true;
        state.error = null;
    })
     .addCase(user_all_order.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true; 
      state.orders.push(action.payload);     
    })
    .addCase(user_all_order.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;     
    })

    //user order details:
    .addCase(get_user_order_details.pending, state => {
      state.isLoading = true;
        state.error = null;
    })
     .addCase(get_user_order_details.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true; 
      state.orders_details = action.payload;     
    })
    .addCase(get_user_order_details.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;     
    })

    
  },
})
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
 