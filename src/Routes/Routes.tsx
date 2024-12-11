import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import CartPage from "../Pages/CartPage/CartPage";
import CollectionPage from "../Pages/CollectionPage/CollectionPage";
import ProductPage from "../Pages/ProductPage/ProductPage";
import MainPage from "../Pages/MainPage/MainPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import AccountPage from "../Pages/AccountPage/AccountPage";
import OrderHistoryPage from "../Pages/OrderHistoryPage/OrderHistoryPage";
import ChangePasswordPage from "../Pages/ChangePasswordPage/ChangePasswordPage";
import { useContext } from "react";
import { UserContext } from "../Components/ContentComponents/UserContext/UserContext";
import PrivateRoute from "../Components/ContentComponents/PrivateRoute/PrivateRoute";
import ForgotPasswordPage from "../Pages/ForgotPasswordPage/ForgotPasswordPage";

const Routes = () => {
  const { user } = useContext(UserContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: <HomePage /> },
        { path: "cart", element: <CartPage /> },
        { path: "collection", element: <CollectionPage /> },
        { path: "category/:ticker", element: <MainPage /> },
        { path: "subCategory/:ticker", element: <MainPage /> },
        { path: "product/:ticker", element: <ProductPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "login", element: <LoginPage /> },
        {
          path: "user",
          element: <PrivateRoute isAuthenticated={user?.isAuthenticated} />,
          children: [
            { path: "account", element: <AccountPage /> },
            { path: "order-history", element: <OrderHistoryPage /> },
            { path: "change-password", element: <ChangePasswordPage /> },
          ],
        },
        { path: "forgot", element: <ForgotPasswordPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
export default Routes;
