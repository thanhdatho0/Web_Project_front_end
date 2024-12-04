import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import CartPage from "../Pages/CartPage/CartPage";
import CollectionPage from "../Pages/CollectionPage/CollectionPage";
import SubcategoryPage from "../Pages/SubcategoryPage/SubcategoryPage";
import ProductPage from "../Pages/ProductPage/ProductPage";
import MainPage from "../Pages/MainPage/MainPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "cart", element: <CartPage /> },
      { path: "collection", element: <CollectionPage /> },
      { path: "category/:ticker", element: <MainPage /> },
      { path: "subcategory/:ticker", element: <MainPage /> },
      // { path: "subcategory/:ticker", element: <SubcategoryPage /> },
      { path: "product/:ticker", element: <ProductPage /> },
    ],
  },
]);
