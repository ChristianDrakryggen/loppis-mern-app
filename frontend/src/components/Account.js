import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import ProductService from "../services/ProductService";
import OrderService from "../services/OrderService";
import UserService from "../services/UserService";
import OrderItem from "./OrderItem";
import AddressService from "../services/AddressService";
import PersonalInfo from "./PersonalInfo";
import Products from "./Products";
import Address from "./Address";

const Account = () => {
  const authContext = useContext(AuthContext);

  const [products, setProducts] = useState([]);

  const [orders, setOrders] = useState([]);

  const [orderHistory, setOrderHistory] = useState([]);

  //message state to be used for snackbar notifications later
  const [message, setMessage] = useState(null);

  //Product handlers
  const removeProduct = (product) => {
    ProductService.removeProduct(product).then((data) => {
      const { message } = data;
      if (!message.msgError) {
        ProductService.getMyProducts().then((data) => {
          setProducts(data.products);
          setMessage(message);
        });
      } else if (message.msgBody === "Unauthorized") {
        setMessage(message);
        authContext.setUser({ username: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(message);
      }
    });
  };

  //order handlers
  const removeOrder = (order) => {
    OrderService.removeOrder(order).then((data) => {
      const { message } = data;
      if (!message.msgError) {
        OrderService.getOrders().then((data) => {
          setOrders(data.orders);
          setMessage(message);
        });
      } else if (message.msgBody === "Unauthorized") {
        setMessage(message);
        authContext.setUser({ username: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(message);
      }
    });
  };

  useEffect(() => {
    if (authContext.user.username !== "") {
      ProductService.getMyProducts().then((data) => {
        if (data && data.products) {
          setProducts(data.products);
        }
      });
      OrderService.getOrders().then((data) => {
        if (data && data.orders) {
          setOrders(data.orders);
        }
      });
      OrderService.getOrderHistory().then((data) => {
        setOrderHistory(data.orderHistory);
      });
    }
  }, []);

  return (
    <>
      <h1>Account</h1>
      <PersonalInfo authContext={authContext} setMessage={setMessage} />
      <div
        style={{
          display: "flex",
          margin: "10px 0px",
          justifyContent: "space-between",
        }}
      >
        <Products
          authContext={authContext}
          setMessage={setMessage}
          products={products}
          setProducts={setProducts}
          removeProduct={removeProduct}
        />
        <div>
          <p style={{ fontWeight: "bold" }}>Incoming orders</p>
          {orders
            .slice()
            .reverse()
            .map((order) => (
              <OrderItem
                key={order._id}
                order={order}
                removeOrder={removeOrder}
              />
            ))}
        </div>
        <Address authContext={authContext} setMessage={setMessage} />
      </div>
      <div style={{ padding: "20px 20px 0px 0px", width: "33%" }}>
        <p style={{ fontWeight: "bold", marginTop: "0px" }}>Order history</p>
        {orderHistory.map((order) => (
          <OrderItem
            order={order}
            key={order._id}
            removeOrder={removeOrder}
            orderHistory={true}
          />
        ))}
      </div>
    </>
  );
};

export default Account;
