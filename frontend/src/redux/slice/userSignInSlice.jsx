import { createSlice } from '@reduxjs/toolkit'
import {userSignIn} from '../thunk/userThunk';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

  const initialState = {
    isLoading: false, // Flag for loading state
    error: null, // Store any errors
    success: false, // Indicate successful registration
   user :user ? user : null,

  }

  export const userSignInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {},
  
    extraReducers: (builder) => {
      builder
      .addCase(userSignIn.pending, state => {
        state.isLoading = true;
          state.error = null;
      })
       .addCase(userSignIn.fulfilled, (state, action) => {
        state.user = action.payload,
        state.isLoading = false;
        state.success = true;      
      })
      .addCase(userSignIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; 
        state.user = null     
      })
    },
  })
  
  export default userSignInSlice.reducer

