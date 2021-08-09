import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";

import classes from "./Cart.module.css";

const Cart = (props) => {
  const { items, totalAmount } = useContext(CartContext);
  const fixedAmount = `$${totalAmount.toFixed(2)}`;
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => (
        <li>{item.name}</li>
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
