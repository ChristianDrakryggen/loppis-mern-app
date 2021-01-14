import React, { useState } from "react";

const OrderItem = (props) => {
  const { order, removeOrder, orderHistory = false } = props;
  const [showOrder, setShowOrder] = useState(false);
  return (
    <>
      <div
        style={{
          display: "flex",
          marginBottom: "10px",
          borderBottom: "1px solid #e1e1e1",
          padding: "5px",
        }}
      >
        {!orderHistory && (
          <p
            style={{ marginRight: "5px" }}
          >{`${order.firstname} ${order.lastname} | ${order.email}`}</p>
        )}
        {orderHistory && (
          <p style={{ marginRight: "5px" }}>{`# ${order._id}`}</p>
        )}
        {!showOrder && (
          <button onClick={() => setShowOrder(true)}>Show info</button>
        )}
        {showOrder && (
          <button onClick={() => setShowOrder(false)}>Hide info</button>
        )}
        {!orderHistory && (
          <button onClick={() => removeOrder(order)}>Remove</button>
        )}
      </div>
      {showOrder && (
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #e1e1e1",
            padding: "0px",
          }}
        >
          {!orderHistory && (
            <>
              <div style={{ padding: "0px 10px" }}>
                <p>{`Order number: ${order._id}`}</p>
                <p>{`Name: ${order.firstname} ${order.lastname}`}</p>
                <p>{`Phone: ${order.phone}`}</p>
                <p>{`Email: ${order.email}`}</p>
              </div>
              <div style={{ padding: "0px 10px" }}>
                <p style={{ fontWeight: "bold" }}>Adress</p>
                <p>{`${order.street}`}</p>
                <p>{`${order.zipCode}, ${order.town}`}</p>
                <p>{`${order.country}`}</p>
              </div>
              <div style={{ padding: "0px 10px" }}>
                <p style={{ fontWeight: "bold" }}>Products</p>
                {order.products.map((product) => (
                  <div key={product._id}>
                    <p>{product.name}</p>
                    <ul>
                      <li>{`ID: ${product._id}`}</li>
                      <li>{`Qty: ${product.count}`}</li>
                      <li>{`Price: ${product.price}`}</li>
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}
          {orderHistory && (
            <div style={{ padding: "0px 10px" }}>
              <p>{`Order number: ${order._id}`}</p>
              <p style={{ fontWeight: "bold" }}>Products</p>
              {order.products.map((product) => (
                <div key={product._id}>
                  <p>{product.name}</p>
                  <ul>
                    <li>{`ID: ${product._id}`}</li>
                    <li>{`Qty: ${product.count}`}</li>
                    <li>{`Price: ${product.price}`}</li>
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OrderItem;
