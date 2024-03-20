import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GET_ALL_PRODUCT_URL, GET_SINGLE_PRODUCT_URL } from "../../api/api";


const BASE_URL = import.meta.env.VITE_BACKEND_URL;
 


export const getAllProduct = createAsyncThunk(
  "product/fetchProductApi",
  async (product, { rejectWithValue }) => {
    try {
      const configAxios = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const productData = await axios.get(
        `${BASE_URL}${GET_ALL_PRODUCT_URL}`,
        product,
        configAxios
      );
      
      return productData.data.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const getSingleProduct = createAsyncThunk(
  "product/fetchSingleProductApi",
  async (_id, { rejectWithValue }) => {
    try {
     
      const configAxios = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const productData = await axios.get(
        `${BASE_URL}${GET_SINGLE_PRODUCT_URL}/${_id}`,
        configAxios
      );
      console.log(productData.data);
      return productData.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
