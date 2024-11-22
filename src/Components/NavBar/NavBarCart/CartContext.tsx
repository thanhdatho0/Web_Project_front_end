import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const addToCart = (quantity: number) => {
    setCount((prevCount) => prevCount + quantity);
  };

  return (
    <CartContext.Provider value={{ count, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
