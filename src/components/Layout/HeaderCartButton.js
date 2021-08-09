import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartProvider from "../../store/CartProvider";
import CartIcon from "../Cart/CartIcon";

// css
import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const { items } = useContext(CartContext);
  return (
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>
        {items.reduce((currentNumber, item) => {
          return currentNumber + item.amount;
        }, 0)}
      </span>
    </button>
  );
};

export default HeaderCartButton;
