import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const signin = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("auth/login", data);
      return response.data;
    } catch (error) {
       return rejectWithValue(error.response?.data || { message: "Signin failed" });
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("auth/signup", data);
      return response.data;
    } catch (error) {
       return rejectWithValue(error.response?.data || { message: "Signup failed" });
    }
  }
);