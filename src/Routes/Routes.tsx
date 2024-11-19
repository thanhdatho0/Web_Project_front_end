import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import CartPage from "../Pages/CartPage/CartPage";
import CollectionPage from "../Pages/CollectionPage/CollectionPage";
import CategoryPage from "../Pages/CategoryPage/CategoryPage";
import ProductPage from "../Pages/ProductPage/ProductPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "Cart", element: <CartPage /> },
      { path: "collection", element: <CollectionPage /> },
      { path: "category/:ticker", element: <CategoryPage /> },
      { path: "product/:ticker", element: <ProductPage /> },
    ],
  },
]);
