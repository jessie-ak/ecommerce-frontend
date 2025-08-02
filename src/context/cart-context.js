import { createContext, useContext, useReducer, useEffect } from "react";
import { cartReducer } from "../reducers/cartReducer";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const initialValue = {
    cart: [],
    wishlist: []
  };

  // Don't destructure immediately - keep the full state object
  const [state, cartDispatch] = useReducer(cartReducer, initialValue, () => {
    try {
      const localData = localStorage.getItem('cartState');
      return localData ? JSON.parse(localData) : initialValue;
    } catch (error) {
      console.error("Failed to parse cart state", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      // Save the complete state object
      localStorage.setItem('cartState', JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save cart state", error);
    }
  }, [state]); // Watch the entire state object

  // Now destructure for the Provider value
  const { cart, wishlist } = state;
  
  return (
    <CartContext.Provider value={{ cart, wishlist, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };