import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BasketContext } from "../context/BasketContext";
import Stores from "../staticData/Stores";

const Checkout = () => {
  const [stores, setStores] = useState([]);

  const basketContext = useContext(BasketContext);
  const history = useHistory();

  const removeFromBasket = (product) => {
    basketContext.setBasket(
      [...basketContext.basket].filter((p) => p.id !== product.id)
    );
  };

  const checkout = (basket, store) => {
    alert(JSON.stringify(store));
    alert(
      JSON.stringify(
        basket.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
      )
    );
    basketContext.setBasket(
      [...basketContext.basket].filter((product) => !basket.includes(product))
    );
  };

  useEffect(() => {
    setStores(Stores.getStores());
  }, []);

  return (
    <>
      <h1>Checkout</h1>
      {basketContext.basket.length > 0 ? (
        <div>
          {stores.map((store) => {
            if (
              store.products.some((p) =>
                basketContext.basket.some((product) => p === product.id)
              )
            ) {
              return (
                <div
                  key={store.id}
                  style={{ borderBottom: "2px solid black", padding: "20px" }}
                >
                  <h3>{store.name}</h3>
                  <div>
                    {basketContext.basket
                      .filter((product) =>
                        store.products.some((p) => p === product.id)
                      )
                      .slice()
                      .filter(
                        (v, i, a) => a.findIndex((t) => t.id === v.id) === i
                      )
                      .map((product) => (
                        <div
                          key={product.id}
                          style={{
                            display: "flex",
                            padding: "10px",
                            borderBottom: "1px solid #e1e1e1",
                          }}
                        >
                          <p style={{ paddingRight: "10px" }}>{`${
                            product.name
                          } ${product.count} - ${
                            product.price * product.count
                          } kr`}</p>
                          <button
                            onClick={() => {
                              removeFromBasket(product);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                      <p>{`Total: ${basketContext.basket
                        .filter((product) =>
                          store.products.some((p) => p === product.id)
                        )
                        .map((product) => product.price)
                        .reduce(
                          (partialSum, total) => partialSum + total,
                          0
                        )} kr`}</p>
                      <button
                        style={{ marginTop: "20px" }}
                        onClick={() =>
                          checkout(
                            basketContext.basket.filter((product) =>
                              store.products.some((p) => p === product.id)
                            ),
                            store
                          )
                        }
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
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
