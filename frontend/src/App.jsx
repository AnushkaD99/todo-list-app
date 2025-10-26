import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./pages/SignIn";
import Signup from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Signin />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer autoClose={2000} position="bottom-left" />
    </Provider>
  );
}

export default App;
