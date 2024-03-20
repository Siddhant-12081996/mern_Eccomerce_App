import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {CREATE_ORDER_URL, GET_ORDER_BY_ID_URL, GET_USER_ORDERS_URL} from "../../api/api"

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
 


export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, { rejectWithValue }) => {
    try {
      const configAxios = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const orderData = await axios.post(
        `${BASE_URL}${CREATE_ORDER_URL}`,
        order,
        configAxios
      );
      if(orderData.data){
        localStorage.setItem('user', JSON.stringify(orderData.data))
    }
      return orderData.data;
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const user_all_order = createAsyncThunk(
  "order/getUserAllOrder",
  async (order, { rejectWithValue }) => {
    try {
      const configAxios = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const orderData = await axios.get(
        `${BASE_URL}${GET_USER_ORDERS_URL}`,
        order,
        configAxios
      );
      if(orderData.data){
        localStorage.setItem('user', JSON.stringify(orderData.data))
    }
      return orderData.data;
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)


export const get_user_order_details = createAsyncThunk(
  "order/getUserOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const configAxios = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const orderData = await axios.get(
        `${BASE_URL}${GET_ORDER_BY_ID_URL}/${id}`,
        configAxios
      );
      if(orderData.data){
        localStorage.setItem('user', JSON.stringify(orderData.data))
    }
      return orderData.data;
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)