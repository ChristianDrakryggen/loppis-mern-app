import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { BasketContext } from "./context/BasketContext";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Loppis from "./components/Loppis";
import Login from "./components/Login";
import Register from "./components/Register";
import Checkout from "./components/Checkout";
import Account from "./components/Account";
import InsideStore from "./components/InsideStore";

function App() {
  const authContext = useContext(AuthContext);
  const basketContext = useContext(BasketContext);

  console.log(authContext.isAuthenticated);
  console.log(basketContext);

  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Loppis} />
      <Route path="/account" component={Account} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/insidestore/:id" component={InsideStore} />
    </Router>
  );
}

export default App;
