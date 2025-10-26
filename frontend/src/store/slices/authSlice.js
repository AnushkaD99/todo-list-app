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
    })
    .addCase(signup.fulfilled, (state, action) => {
      handleAuthSuccess(state, action.payload);
    });
  }
});

// handle authentication success
const handleAuthSuccess = (state, data) => {

  const { token, username } = data;

  state.isAuthenticated = true;
  state.user = username;

  localStorage.setItem(
    "auth",
    JSON.stringify({
      isAuthenticated: true,
      user: username,
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