import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "../reducers/cartReducer";

const CartContext = createContext();

const CartProvider =({children})=>{

    const initialValue={
        cart:[],
        wishlist:[]
    }

    const [{cart, wishlist}, cartDispatch] = useReducer(cartReducer, initialValue);
    return(
        <CartContext.Provider value={{cart, wishlist, cartDispatch}}>
            {children}
        </CartContext.Provider>
    )
}

const useCart =()=>useContext(CartContext);

export {CartProvider, useCart};