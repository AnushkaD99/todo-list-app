// app/store.js
import { configureStore } from '@reduxjs/toolkit';
// import usersReducer from '../features/users/usersSlice';
// import todosReducer from '../features/todos/todosSlice';
import authSlice from "./slices/authSlice";


const store = configureStore({
  reducer: {
    // users: usersReducer,
    auth: authSlice,
    // todos: todosReducer
  }
});

export default store;

export { logout } from "./slices/authSlice";

export * from "./thunks/authThunk";