import {
  createSlice
} from "@reduxjs/toolkit";
import { signin, signup } from "../thunks/authThunk";

const authData = localStorage.getItem("auth");
const storedAuth = authData ? JSON.parse(authData) : {};

const initialState = {
  isAuthenticated: storedAuth.isAuthenticated || false,
  user: storedAuth.user || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("auth");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state, action) => {
      handleAuthSuccess(state, action.payload);
    });
  },
  // extraReducers: (builder) => {
  //   builder.addCase(signup.fulfilled, (state, action) => {
  //     handleAuthSuccess(state, action.payload);
  //   });
  // }
});

// Helper function to decode JWT token
const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    console.error("Error decoding token:", error);
    return {};
  }
};

// handle authentication success
const handleAuthSuccess = (state, data) => {

  const { token } = data;
  const decodedToken = decodeToken(token);

  state.isAuthenticated = true;
  // state.user = userData;

  localStorage.setItem(
    "auth",
    JSON.stringify({
      isAuthenticated: true,
      // user: userData,
    })
  );
    if (token) {
    localStorage.setItem("token", token);
  }
};

export const {
  logout
} = authSlice.actions;
export default authSlice.reducer;