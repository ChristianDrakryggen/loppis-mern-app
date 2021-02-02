import React, { createContext, useState, useEffect } from "react";

export const BasketContext = createContext();

export default ({ children }) => {
  const [basket, setBasket] = useState([]);
  const [showBasket, setShowBasket] = useState(false);

  useEffect(() => {
    let fromStorage = JSON.parse(localStorage.getItem("storageBasket"));
    if (fromStorage) {
      setBasket(fromStorage);
    }
  }, []);

  return (
    <div>
      <BasketContext.Provider
        value={{ basket, setBasket, showBasket, setShowBasket }}
      >
        {children}
      </BasketContext.Provider>
    </div>
  );
};
