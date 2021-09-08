import React, { useReducer } from "react";

import CartContext from "./cart-context";
import { reducer } from "./reducer";
const initialState = {
  items: [],
  totalAmount: 0,
};

const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(reducer, initialState);
  const addItemToCartHandler = (item) => {
    dispatch({ type: "ADD_ITEM", item: item });
  }; //addItemToCartHandler and then map to addItem()

  const removeItemFromCart = (id) => {
    dispatch({ type: "REMOVE", id: id });
  };

  const cartContextValues = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCart,
  };
  return (
    <CartContext.Provider value={cartContextValues}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
