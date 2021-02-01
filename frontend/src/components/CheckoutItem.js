import React, { useContext, useEffect, useState } from "react";
import { BasketContext } from "../context/BasketContext";
import { AuthContext } from "../context/AuthContext";
import OrderService from "../services/OrderService";
import AddressService from "../services/AddressService";

const CheckoutItem = (props) => {
  const { store, setMessage } = props;
  const basketContext = useContext(BasketContext);
  const authContext = useContext(AuthContext);

  const [order, setOrder] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    street: "",
    zipCode: "",
    town: "",
    country: "",
    products: [],
    storeOwnerId: "",
    handled: false,
  });

  const removeFromBasket = (product) => {
    basketContext.setBasket(
      [...basketContext.basket].filter((p) => p._id !== product._id)
    );
  };

  const checkout = (basket, store, e) => {
    e.preventDefault();
    const checkoutBasket = basket.filter(
      (v, i, a) => a.findIndex((t) => t._id === v._id) === i
    );
    const storeId = store._id;
    setOrder({ ...order, products: checkoutBasket, storeOwnerId: storeId });
  };

  const onChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (order.storeOwnerId !== "") {
      OrderService.newOrder(order)
        .then((data) => {
          if (data && data.message) {
            setMessage(data.message);
          }
        })
        .then(() => {
          OrderService.newOrderHistoryItem(order).then((data) => {
            if (data && data.message) {
              setMessage(
                data.message.msgBody === "Unauthorized"
                  ? { msgBody: "Check your email" }
                  : { msgBody: `${data.message.msgBody}, Check your email` }
              );
            }
          });
        });
      basketContext.setBasket(
        [...basketContext.basket].filter(
          (product) => !order.products.includes(product)
        )
      );
    }
  }, [order.products]);

  useEffect(() => {
    if (authContext.isAuthenticated) {
      AddressService.getAddress().then((data) => {
        if (data && data.address) {
          setOrder({
            ...order,
            firstname: authContext.user.firstname,
            lastname: authContext.user.lastname,
            email: authContext.user.email,
            phone: authContext.user.phone,
            street: data.address.street,
            zipCode: data.address.zipCode,
            town: data.address.town,
            country: data.address.country,
          });
        }
      });
    }
  }, [authContext.isAuthenticated]);

  return (
    <div style={{ borderBottom: "2px solid black", padding: "20px" }}>
      <h3>{store.username}</h3>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%", marginRight: "2%" }}>
          {basketContext.basket
            .filter((product) => store.products.some((p) => p === product._id))
            .slice()
            .filter((v, i, a) => a.findIndex((t) => t._id === v._id) === i)
            .map((product) => (
              <div
                key={product._id}
                style={{
                  display: "flex",
                  padding: "10px",
                  borderBottom: "1px solid #e1e1e1",
                }}
              >
                <p style={{ paddingRight: "10px" }}>{`${product.name} ${
                  product.count
                } - ${product.price * product.count} kr`}</p>
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
        <form
          onSubmit={(e) =>
            checkout(
              basketContext.basket.filter((product) =>
                store.products.some((p) => p === product._id)
              ),
              store,
              e
            )
          }
        >
          <h3>Delivery/invoicing address</h3>
          <input
            name="firstname"
            value={order.firstname}
            onChange={onChange}
            required
            placeholder="Firstname"
          />
          <input
            name="lastname"
            value={order.lastname}
            onChange={onChange}
            required
            placeholder="Lastname"
          />
          <input
            name="email"
            value={order.email}
            onChange={onChange}
            required
            placeholder="Email"
          />
          <input
            name="phone"
            value={order.phone}
            onChange={onChange}
            required
            placeholder="Phone"
          />
          <input
            name="street"
            value={order.street}
            onChange={onChange}
            required
            placeholder="Street"
          />
          <input
            name="zipCode"
            value={order.zipCode}
            onChange={onChange}
            required
            placeholder="Zipcode"
          />
          <input
            name="town"
            value={order.town}
            onChange={onChange}
            required
            placeholder="Town"
          />
          <input
            name="country"
            value={order.country}
            onChange={onChange}
            required
            placeholder="Country"
          />
          <p>{`Total: ${basketContext.basket
            .filter((product) => store.products.some((p) => p === product._id))
            .map((product) => product.price)
            .reduce((partialSum, total) => partialSum + total, 0)} kr`}</p>
          <button style={{ marginTop: "10px" }} type="submit">
            Checkout
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutItem;
