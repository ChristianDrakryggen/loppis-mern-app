import React, { createContext, useState } from "react";

export const BasketContext = createContext();

export default ({ children }) => {
  const [basket, setBasket] = useState([]);
  const [showBasket, setShowBasket] = useState(false);

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
