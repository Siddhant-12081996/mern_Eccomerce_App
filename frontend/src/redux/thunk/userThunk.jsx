import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {GET_USER_PROFILE_URL, UPDATE_USER_PROFILE_URL, USERS_LOGOUT_URL, USERS_SIGNIN_URL, USERS_SIGNUP_URL } from "../../api/api"
import { useSelector } from "react-redux";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const userSignUp = createAsyncThunk(
    'user/fetchSignUpApi',
    async(userdata,{rejectWithValue})=>{
        try{
            const configAxios={
                "headers":{
                    'Content-Type': 'application/json'
                }
            }
            const response=await axios.post(`${BASE_URL}${USERS_SIGNUP_URL}`,userdata,configAxios);
           
            if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data))
              }
           
          
    return response.data.user;
        }catch(error){
return rejectWithValue(error.message)
        }
    }
)


export const userSignIn = createAsyncThunk(
    'user/fetchSignInApi',
    async(userCredentials,{rejectWithValue})=>{
        try{
           
            const configAxios={
                "headers":{
                    'Content-Type': 'application/json',
                }
            }
            const response=await axios.post(`${BASE_URL}${USERS_SIGNIN_URL}`,userCredentials,configAxios);
            if(response.data){
                localStorage.setItem('user', JSON.stringify(response.data))
            }
       
    return response.data;
        }catch(error){
return rejectWithValue(error.message)
        }
    }
)


export const userLogout = createAsyncThunk(
    'user/fetchLogoutApi',
    async(logout,{rejectWithValue})=>{
        try{
           
            const configAxios={
                "headers":{
                    'Content-Type': 'application/json',
                }
            }
            const response=await axios.post(`${BASE_URL}${USERS_LOGOUT_URL}`,logout,configAxios);
            if(response.data.success){
                localStorage.removeItem('user')
            }
      
    return response.data;
        }catch(error){
return rejectWithValue(error.message)
        }
    }
)


export const update_user_Profile = createAsyncThunk(
    'user/fetchUpdateProfileApi',
    async(update,{rejectWithValue},{ getState })=>{
        try{
            const authToken = getState().auth.token;            const config = {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${authToken}`,
                },

              };
            const {response}=await axios.put(`${BASE_URL}${UPDATE_USER_PROFILE_URL}`,update,config);
            if(response.data){
                localStorage.setItem('user', JSON.stringify(response.data))
            }
       console.log(response)
    return response;
        }catch(error){
return rejectWithValue(error.message)
        }
    }
)

export const get_user_Profile = createAsyncThunk(
    'user/fetchGetProfileApi',
    async(user,{rejectWithValue})=>{
        try{
           
            const config = {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              };
            const response=await axios.put(`${BASE_URL}${GET_USER_PROFILE_URL}`,user,config);
            if(response.data){
                localStorage.setItem('user', JSON.stringify(response.data))
            }
       
    return response.data;
        }catch(error){
return rejectWithValue(error.message)
        }
    }
)

