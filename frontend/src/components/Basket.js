import React, { useContext } from "react";
import { BasketContext } from "../context/BasketContext";

const Basket = () => {
  const basketContext = useContext(BasketContext);

  const removeFromBasket = (product) => {
    basketContext.setBasket(
      basketContext.basket.filter((item) => item._id !== product._id)
    );
    localStorage.setItem(
      "storageBasket",
      JSON.stringify(
        basketContext.basket.filter((item) => item._id !== product._id)
      )
    );
  };

  return (
    <>
      {basketContext.showBasket && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderBottom: "1px solid black",
            padding: "10px 10px 10px 20px",
          }}
        >
          {basketContext.basket.length > 0 ? (
            <div>
              {basketContext.basket
                //filter function before map to retrieve only the last added item with a specific id (aka the item with the highest count value),
                //slice() before filter as a precaution to not modify state directly
                .slice()
                .filter((v, i, a) => a.findIndex((t) => t._id === v._id) === i)
                .map((product) => (
                  <div
                    key={product.id}
                    style={{
                      display: "flex",
                      padding: "10px",
                      borderBottom: "1px solid #e1e1e1",
                    }}
                  >
                    <p style={{ paddingRight: "10px" }}>{`${product.name} ${
                      product.count
                    } st - ${product.price * product.count} kr`}</p>
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
          <div style={{ display: "flex" }}>
            <p style={{ paddingRight: "10px" }}>
              {`Total: ${basketContext.basket
                .map((product) => product.price)
                .reduce((partialSum, total) => partialSum + total, 0)}`}
            </p>
            <button onClick={() => basketContext.setShowBasket(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Basket;
