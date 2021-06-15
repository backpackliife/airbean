import "./Cart.scss";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCart,
  selectTotalPrice,
  resetCart,
  setLatestOrder,
} from "../features/cart/cartSlice";
import { selectUsername } from "../features/user/userSlice";

export function Cart({ toggle }) {
  const history = useHistory();
  const items = useSelector(selectCart);
  const total = useSelector(selectTotalPrice);
  const username = useSelector(selectUsername);
  const dispatch = useDispatch();

  const isEmpty = items.length === 0;

  async function placeOrder() {
    try {
      const order = {
        username,
        items: items.map(({ id, quantity }) => ({ id, quantity })),
      };
      let response = await fetch(`${process.env.REACT_APP_API_URL}/order`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      if (response.ok) {
        response = await response.json();
        dispatch(resetCart());
        dispatch(setLatestOrder(response));
        history.push("/status");
        toggle();
      }
    } catch (error) {
      console.error("failed placing order", error);
    }
  }

  return (
    <div className="cart">
      <div className="backdrop" onClick={toggle}></div>
      <div className="cart-card">
        <h2 className="title">Din beställning</h2>
        <div className="cart-list">
          {isEmpty && <center>Här var det tomt</center>}
          {items.map((item, index) => (
            <div className="cart-item" key={index}>
              <div className="item-info">
                <span className="item-title">{item.title}</span>
                <span className="item-price">
                  {item.price * item.quantity}kr
                </span>
              </div>
              <div className="spacer"></div>
              <span className="quantity">{item.quantity}</span>
            </div>
          ))}
        </div>
        <div className="total-container">
          <div className="cart-item">
            <div className="item-info">
              <span className="item-title">Total</span>
              <span className="item-price">inkl moms + drönarleverans</span>
            </div>
            <div className="spacer"></div>
            <span className="quantity">{total}kr</span>
          </div>
        </div>
        <div
          className={`button ${isEmpty ? "disabled" : ""}`}
          onClick={placeOrder}
        >
          Take my money!
        </div>
      </div>
    </div>
  );
}
