import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BasketContext } from "../context/BasketContext";
import Stores from "../staticData/Stores";
import UserService from "../services/UserService";
import CheckoutItem from "./CheckoutItem";

const Checkout = () => {
  const [stores, setStores] = useState([]);
  const [message, setMessage] = useState(null);

  const basketContext = useContext(BasketContext);
  const history = useHistory();

  const getStores = () => {
    UserService.getUsers().then((data) => {
      if (data) {
        setStores(data.users);
      }
    });
  };

  useEffect(() => {
    getStores();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  }, [message]);

  return (
    <>
      <h1>Checkout</h1>
      {message !== null && <p>{message.msgBody}</p>}
      {basketContext.basket.length > 0 ? (
        <div>
          {stores.map((store) => {
            if (
              store.products.some((p) =>
                basketContext.basket.some((product) => p === product._id)
              )
            ) {
              return (
                <CheckoutItem
                  key={store._id}
                  store={store}
                  setMessage={setMessage}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      ) : (
        <div>
          <p>No items...</p>
          <button onClick={() => history.push("/")}>Back to market</button>
        </div>
      )}
    </>
  );
};

export default Checkout;
