import React from "react";
import { Link } from "react-router-dom";
import "./Status.scss";
import picture from "../assets/drone.png";
import { useSelector } from "react-redux";
import { selectLatestOrder } from "../features/cart/cartSlice";

const time = new Intl.RelativeTimeFormat("sv");

const getMinDiff = (date1, date2) => {
  const diff = Math.abs(date1 - date2);
  const minutes = Math.floor(diff / 1000 / 60);
  return minutes;
};

export function Status() {
  const order = useSelector(selectLatestOrder);

  const minutes = getMinDiff(new Date(order.eta), new Date());

  return (
    <div className="status">
      <div className="status-container">
        <div className="order-info">
          <span className="order-label">Ordernummer</span>
          <span className="order-number">#{order.id}</span>
        </div>
        <img src={picture} alt="Drone" />
        <h2>Din beställning är på väg</h2>
        <span className="eta">{time.format(minutes, "minute")}</span>
        <Link to="/menu" className="ok-button">
          <div className="button">Ok, cool!</div>
        </Link>
      </div>
    </div>
  );
}
