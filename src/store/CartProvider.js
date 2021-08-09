import React, { useReducer } from "react";

import CartContext from "./cart-context";
const initialState = {
  items: [],
  totalAmount: 0,
};
const reducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    // return { ...state };
    const updatedItems = state.items.concat(action.item);
    const updatedAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }
  if (action.type === "REMOVE") {
    return { ...state };
  }
  return state;
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
