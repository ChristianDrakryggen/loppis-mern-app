import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Basket from "./Basket";
import { BasketContext } from "../context/BasketContext";
import { AuthContext } from "../context/AuthContext";
import AuthService from "../services/AuthService";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const basketContext = useContext(BasketContext);
  const history = useHistory();

  const linkStyle = () => {
    return { margin: "10px" };
  };

  const logOut = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        authContext.setUser(data.user);
        authContext.setIsAuthenticated(false);
        history.push("/login");
      }
    });
  };

  //Navbar to return if authContext.isAuthenticated is true
  const authNavbar = () => {
    return (
      <>
        <div style={{ display: "flex" }}>
          <NavLink to="/">
            <p style={linkStyle()}>Loppis</p>
          </NavLink>
          <NavLink to="/account">
            <p style={linkStyle()}>Account</p>
          </NavLink>
        </div>
        <div style={{ display: "flex" }}>
          <p style={{ fontWeight: "bold" }}>
            Items in cart: <span>{basketContext.basket.length}</span>
          </p>
          {basketContext.showBasket ? (
            <button
              style={linkStyle()}
              onClick={() => basketContext.setShowBasket(false)}
            >
              Hide basket
            </button>
          ) : (
            <button
              style={linkStyle()}
              onClick={() => basketContext.setShowBasket(true)}
            >
              Show basket
            </button>
          )}
        </div>
        <div style={{ display: "flex" }}>
          <NavLink to="/checkout">
            <p style={linkStyle()}>Checkout</p>
          </NavLink>
          <button style={linkStyle()} onClick={logOut}>
            Logout
          </button>
        </div>
      </>
    );
  };

  //Navbar to return if authContext.isAuthenticated is false
  const unAuthNavbar = () => {
    return (
      <>
        <div style={{ display: "flex" }}>
          <NavLink to="/">
            <p style={linkStyle()}>Loppis</p>
          </NavLink>
          <NavLink to="/login">
            <p style={linkStyle()}>Login</p>
          </NavLink>
          <NavLink to="/register">
            <p style={linkStyle()}>Register</p>
          </NavLink>
        </div>
        <div style={{ display: "flex" }}>
          <p style={{ fontWeight: "bold" }}>
            Items in cart: <span>{basketContext.basket.length}</span>
          </p>
          {basketContext.showBasket ? (
            <button
              style={linkStyle()}
              onClick={() => basketContext.setShowBasket(false)}
            >
              Hide basket
            </button>
          ) : (
            <button
              style={linkStyle()}
              onClick={() => basketContext.setShowBasket(true)}
            >
              Show basket
            </button>
          )}
        </div>
        <div>
          <NavLink to="/checkout">
            <p style={linkStyle()}>Checkout</p>
          </NavLink>
        </div>
      </>
    );
  };

  return (
    <>
      <Basket />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid black",
          padding: "10px 20px 0px 20px",
        }}
      >
        {authContext.isAuthenticated ? authNavbar() : unAuthNavbar()}
      </div>
    </>
  );
};

export default Navbar;
