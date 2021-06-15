import React, { useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import { useDispatch } from "react-redux";
import { add } from "../features/cart/cartSlice";
import "./Menu.scss";

export function Menu() {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchCoffee();
  }, []);

  async function fetchCoffee() {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/coffee`);
      if (response.ok) {
        response = await response.json();
        setItems(response);
      }
    } catch (error) {
      console.error("failed fetching menu", error);
    }
  }

  return (
    <div className="menu">
      <h1>Meny</h1>
      <div className="menu-list">
        {items.map((item, index) => (
          <div className="menu-item" key={index}>
            <div
              className="button add-button"
              onClick={() => dispatch(add(item))}
            >
              +
            </div>
            <div className="item-info">
              <span className="title">{item.title}</span>
              <span className="description">{item.desc}</span>
            </div>
            <span className="price">{item.price}kr</span>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
