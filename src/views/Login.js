import React, { useState } from "react";
import "./Login.scss";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import { useHistory } from "react-router-dom";

export function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  async function login() {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/account`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password: "123", email }),
      });
      if (response.ok || response.status === 409) {
        response = await response.json();
        dispatch(setUser({ username, email }));
        history.push("/menu");
      } else {
        console.error("login failed");
      }
    } catch (error) {
      console.error("failed placing order", error);
    }
  }
  return (
    <div className="login">
      <div className="welcome-card">
        <h2>Välkommen till AirBean-familjen!</h2>
        <p>
          Genom att skapa ett konto nedan kan du spara och se din orderhistorik.
        </p>
        <div className="form">
          <div className="form-group">
            <label htmlFor="username">Namn</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Epost</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="button" onClick={login}>
          Logga in
        </div>
      </div>
    </div>
  );
}
