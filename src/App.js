import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { Login } from "./views/Login";
import { Menu } from "./views/Menu";
import { About } from "./views/About";
import { Profile } from "./views/Profile";
import { Status } from "./views/Status";
import "./App.css";
import { Header } from "./components/Header";
import { useSelector } from "react-redux";
import { selectUsername, selectEmail } from "./features/user/userSlice";

const LIGHT_PATHS = ["/menu", "/about"];

function App() {
  const location = useLocation();
  const username = useSelector(selectUsername);
  const email = useSelector(selectEmail);

  const authorized = username && email;

  const shouldBeLight = () => {
    return LIGHT_PATHS.includes(location.pathname);
  };

  return (
    <div
      className={`
      app 
      ${shouldBeLight() ? "light" : ""} 
    `}
    >
      <div>
        <Header />
      </div>
      <main>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/menu">
            {authorized ? <Menu /> : <Redirect to="/"></Redirect>}
          </Route>
          <Route path="/about">
            {authorized ? <About /> : <Redirect to="/"></Redirect>}
          </Route>
          <Route path="/profile">
            {authorized ? <Profile /> : <Redirect to="/"></Redirect>}
          </Route>
          <Route path="/status">
            {authorized ? <Status /> : <Redirect to="/"></Redirect>}
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
