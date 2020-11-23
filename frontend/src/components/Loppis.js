import React, { useState, useEffect } from "react";
import Stores from "../staticData/Stores";
import Store from "./Store";

const Loppis = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    setStores(Stores.getStores());
  }, []);

  console.log(stores);

  return (
    <>
      <h1>Loppis</h1>
      <div style={{ display: "flex" }}>
        {stores.map((store) => (
          <Store key={store.id} store={store} />
        ))}
      </div>
    </>
  );
};

export default Loppis;
