import React, { useContext } from "react";
import { BasketContext } from "../context/BasketContext";

const Basket = () => {
  const basketContext = useContext(BasketContext);

  const removeFromBasket = (product) => {
    basketContext.setBasket(
      basketContext.basket.filter((item) => item.id !== product.id)
    );
  };

  return (
    <>
      {basketContext.showBasket && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid black",
            padding: "10px 10px 10px 20px",
          }}
        >
          {basketContext.basket.length > 0 ? (
            <div>
              {basketContext.basket.map((product) => (
                <div
                  key={product.id}
                  style={{
                    display: "flex",
                    padding: "10px",
                    borderBottom: "1px solid #e1e1e1",
                  }}
                >
                  <p>{product.name}</p>
                  <button onClick={() => removeFromBasket(product)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ paddingRight: "19px" }}>
              <p>No items...</p>
            </div>
          )}
          <button onClick={() => basketContext.setShowBasket(false)}>
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default Basket;
