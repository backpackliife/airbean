import React, { useState, useEffect } from "react";
import { User } from "../components/User";
import { useSelector } from "react-redux";
import { selectUsername, selectEmail } from "../features/user/userSlice";
import "./Profile.scss";

export function Profile() {
  const username = useSelector(selectUsername);
  const email = useSelector(selectEmail);
  const [orders, setOrders] = useState([]);

  const total = orders.reduce((acc, order) => (acc += order.total), 0);

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchOrders() {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_API_URL}/order/${username}`
      );
      if (response.ok) {
        response = await response.json();
        setOrders(response);
      }
    } catch (error) {
      console.error("failed fetching orders", error);
    }
  }

  return (
    <div className="profile">
      <User username={username} email={email} />
      <div className="order-list">
        <h3>Orderhistorik</h3>
        {orders.map((order) => (
          <div className="order-item" key={order.id}>
            <div className="top">
              <span className="ordernumber">#{order.id}</span>
              <span className="date">{order.date}</span>
            </div>
            <div className="bottom">
              <span className="total-label">total ordersumma</span>
              <span className="price">{order.total}kr</span>
            </div>
          </div>
        ))}
      </div>
      <div className="total">
        <span>Totalt spenderat</span>
        <span>{total}kr</span>
      </div>
    </div>
  );
}
