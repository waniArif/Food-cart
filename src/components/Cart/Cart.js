import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";

import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const { items, totalAmount, addItem, removeItem } = useContext(CartContext);
  const fixedAmount = `$${totalAmount.toFixed(2)}`;
  const handleRemoveCartItems = (id) => {
    removeItem(id);
  };
  const handleAddCartItems = (item) => {
    addItem({ ...item, amount: 1 });
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          onRemove={handleRemoveCartItems.bind(null, item.id)}
          onAdd={handleAddCartItems.bind(null, item)}
        />
      ))}
    </ul>
  );

  const len = items.length > 0;

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{fixedAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button-alt"]} onClick={props.onClose}>
          Close
        </button>
        {len && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
