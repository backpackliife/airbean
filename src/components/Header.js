import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BackgroundPattern } from "./BackgroundPattern";
import { Cart } from "./Cart";
import { useSelector } from "react-redux";
import { selectCartCount } from "../features/cart/cartSlice";
import { selectUsername, selectEmail } from "../features/user/userSlice";
import "./Header.css";

export function Header() {
  const cartCount = useSelector(selectCartCount);
  const [menuStatus, setMenuStatus] = useState(false);
  const [cartStatus, setCartStatus] = useState(false);
  const username = useSelector(selectUsername);
  const email = useSelector(selectEmail);

  const authorized = username && email;

  const toggleMenu = () => {
    setMenuStatus(!menuStatus);
  };
  const toggleCart = () => {
    setCartStatus(!cartStatus);
  };

  const menu = menuStatus ? (
    <div className="menu-button" onClick={toggleMenu}>
      <span>+</span>
    </div>
  ) : (
    <div className="menu-button" onClick={toggleMenu}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );

  return (
    <div className="header">
      <BackgroundPattern className="header-background" />
      {!cartStatus && menu}
      {!menuStatus && authorized && (
        <div className="cart-button" onClick={toggleCart}>
          {cartCount > 0 && <div className="cart-count">{cartCount}</div>}
          <svg
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              fill="currentColor"
              d="M576 216v16c0 13.255-10.745 24-24 24h-8l-26.113 182.788C514.509 462.435 494.257 480 470.37 480H105.63c-23.887 0-44.139-17.565-47.518-41.212L32 256h-8c-13.255 0-24-10.745-24-24v-16c0-13.255 10.745-24 24-24h67.341l106.78-146.821c10.395-14.292 30.407-17.453 44.701-7.058 14.293 10.395 17.453 30.408 7.058 44.701L170.477 192h235.046L326.12 82.821c-10.395-14.292-7.234-34.306 7.059-44.701 14.291-10.395 34.306-7.235 44.701 7.058L484.659 192H552c13.255 0 24 10.745 24 24zM312 392V280c0-13.255-10.745-24-24-24s-24 10.745-24 24v112c0 13.255 10.745 24 24 24s24-10.745 24-24zm112 0V280c0-13.255-10.745-24-24-24s-24 10.745-24 24v112c0 13.255 10.745 24 24 24s24-10.745 24-24zm-224 0V280c0-13.255-10.745-24-24-24s-24 10.745-24 24v112c0 13.255 10.745 24 24 24s24-10.745 24-24z"
            ></path>
          </svg>
        </div>
      )}
      {cartStatus && <Cart toggle={toggleCart} />}
      {menuStatus && (
        <div className="nav">
          <Link to="/menu" onClick={toggleMenu}>
            <h3>Meny</h3>
          </Link>
          <Link to="/about" onClick={toggleMenu}>
            <h3>Vårt kaffe</h3>
          </Link>
          <Link to="/profile" onClick={toggleMenu}>
            <h3>Min profil</h3>
          </Link>
          <Link to="/status" onClick={toggleMenu}>
            <h3>Orderstatus</h3>
          </Link>
        </div>
      )}
    </div>
  );
}
