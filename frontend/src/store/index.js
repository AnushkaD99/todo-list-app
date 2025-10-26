// app/store.js
import { configureStore } from '@reduxjs/toolkit';
// import usersReducer from '../features/users/usersSlice';
import authSlice from "./slices/authSlice";
import taskSlice from "./slices/taskSlice";


const store = configureStore({
  reducer: {
    // users: usersReducer,
    auth: authSlice,
    tasks: taskSlice
  }
});

export default store;

export { logout } from "./slices/authSlice";

export * from "./thunks/authThunk";
export * from "./thunks/taskThunk";