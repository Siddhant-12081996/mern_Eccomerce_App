import { configureStore } from '@reduxjs/toolkit'
import  userSignUpSlice from './slice/userSignupSlice';
import userSignInSlice  from './slice/userSignInSlice';
import productSlice from './slice/productSlice';
import userLogoutSlice from './slice/userLogoutSlice';
import cartSlice from './slice/cartSlice';
import orderSlice from './slice/orderSlice';
import updateUserProfileSlice from './slice/updateUserProfileSlice';
import userProfileSlice from './slice/userProfileSlice';

export const store = configureStore({
  reducer: {
    signUp:userSignUpSlice,
    signIn:userSignInSlice,
    logout:userLogoutSlice,
    products:productSlice,
    cart:cartSlice,
    order:orderSlice,
    updateuserprofile:updateUserProfileSlice,
    userprofile:userProfileSlice,
  },
})