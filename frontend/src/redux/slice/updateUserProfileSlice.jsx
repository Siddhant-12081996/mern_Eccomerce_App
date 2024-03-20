import { createSlice } from '@reduxjs/toolkit'
import { update_user_Profile } from '../thunk/userThunk'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

  const initialState = {
    isLoading: false, // Flag for loading state
    error: null, // Store any errors
    success: false, // Indicate successful registration
   user :user ? user : null,
   isUpdate: false,
  }

  export const updateUserProfileSlice = createSlice({
    name: 'updateuserprofile',
    initialState,
    reducers: {},
  
    extraReducers: (builder) => {
      builder
      .addCase(update_user_Profile.pending, state => {
        state.isLoading = true;
          state.error = null;
      })
       .addCase(update_user_Profile.fulfilled, (state, action) => {
        state.user = action.payload,
        state.isLoading = false;
        state.success = true; 
        state.isUpdate = true;     
      })
      .addCase(update_user_Profile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; 
        state.user = null;
        state.isUpdate = false;     
    
      })
    },
  })
  
  export default updateUserProfileSlice.reducer

