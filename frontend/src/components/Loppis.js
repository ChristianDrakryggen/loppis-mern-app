import React, { useState, useEffect } from "react";
import Stores from "../staticData/Stores";
import Store from "./Store";
import UserService from "../services/UserService";

const Loppis = () => {
  const [stores, setStores] = useState([]);

  const getStores = () => {
    UserService.getUsers().then((data) => {
      setStores(data.users);
    });
  };

  useEffect(() => {
    getStores();
  }, []);

  console.log(stores);

  return (
    <>
      <h1>Loppis</h1>
      <div style={{ display: "flex" }}>
        {stores.map((store) => (
          <Store key={store._id} store={store} />
        ))}
      </div>
    </>
  );
};

export default Loppis;
