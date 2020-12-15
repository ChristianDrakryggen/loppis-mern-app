import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import ProductService from "../services/ProductService";
import OrderService from "../services/OrderService";
import AdressService from "../services/AddressService";
import UserService from "../services/UserService";
import OrderItem from "./OrderItem";
import AddressService from "../services/AddressService";

const Account = () => {
  const authContext = useContext(AuthContext);

  const [personalInfo, setPersonalInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });
  const [addingPersonalInfo, setAddingPersonalInfo] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [products, setProducts] = useState([]);
  const [addingProduct, setAddingProduct] = useState(false);

  const [address, setAddress] = useState({
    street: "",
    zipCode: "",
    town: "",
    country: "",
  });
  const [addingAddress, setAddingAddress] = useState(false);

  const [orders, setOrders] = useState([]);

  //message state to be used for snackbar notifications later
  const [message, setMessage] = useState(null);

  //Product handlers
  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    ProductService.newProduct(product).then((data) => {
      const { message } = data;
      resetForm();
      if (!message.msgError) {
        ProductService.getMyProducts().then((data) => {
          if (data) {
            setProducts(data.products);
            setMessage(message);
          }
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
  const resetForm = () => {
    setProduct({ name: "", description: "", price: "" });
  };

  //PersonalInfo handlers
  const onChangePerInfo = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };
  const addPersonalInfo = (e) => {
    e.preventDefault();
    UserService.updateUser(personalInfo).then((data) => {
      const { message } = data;
      if (!message.msgError) {
        authContext.setUser({
          ...authContext.user,
          firstname: personalInfo.firstname,
          lastname: personalInfo.lastname,
          email: personalInfo.email,
          phone: personalInfo.phone,
        });
        setMessage(message);
        setAddingPersonalInfo(false);
      } else if (message.msgBody === "Unauthorized") {
        setMessage(message);
        authContext.setUser({ username: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(message);
      }
    });
  };

  //Address handlers
  const onChangeAddress = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  const addAddress = (e) => {
    e.preventDefault();
    AddressService.newAddress(address).then((data) => {
      const { message } = data;
      if (!message.msgError) {
        AddressService.getAddress().then((data) => {
          setAddress(data.address);
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
      AddressService.getAddress().then((data) => {
        if (data && data.address) {
          setAddress(data.address);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (addingPersonalInfo) {
      setPersonalInfo({
        ...personalInfo,
        firstname: authContext.user.firstname,
        lastname: authContext.user.lastname,
        email: authContext.user.email,
        phone: authContext.user.phone,
      });
    }
  }, [addingPersonalInfo]);

  return (
    <>
      <h1>Account</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 0px",
          padding: "10px 0px",
          borderBottom: "1px solid #e1e1e1",
        }}
      >
        <p
          style={{ margin: "0px 5px 0px 0px" }}
        >{`Welcome ${authContext.user.username}`}</p>
        {!addingPersonalInfo && (
          <div style={{ display: "flex" }}>
            <button onClick={() => setAddingPersonalInfo(true)}>
              Add/change personal info
            </button>
            <p style={{ margin: "0px 5px 0px 5px" }}>
              {authContext.user.firstname}
            </p>
            <p style={{ margin: "0px 5px 0px 5px" }}>
              {authContext.user.lastname}
            </p>
            <p style={{ margin: "0px 5px 0px 5px" }}>
              {authContext.user.email}
            </p>
            <p style={{ margin: "0px 5px 0px 5px" }}>
              {authContext.user.phone}
            </p>
          </div>
        )}
        {addingPersonalInfo && (
          <form style={{ display: "flex" }} onSubmit={addPersonalInfo}>
            <input
              name="firstname"
              value={personalInfo.firstname}
              onChange={onChangePerInfo}
              placeholder="Firstname"
            />
            <input
              name="lastname"
              value={personalInfo.lastname}
              onChange={onChangePerInfo}
              placeholder="Lastname"
            />
            <input
              name="email"
              value={personalInfo.email}
              onChange={onChangePerInfo}
              placeholder="Email"
            />
            <input
              name="phone"
              value={personalInfo.phone}
              onChange={onChangePerInfo}
              placeholder="Phone"
            />
            <button type="submit">Add</button>
            <button onClick={() => setAddingPersonalInfo(false)}>Cancel</button>
          </form>
        )}
      </div>
      <div
        style={{
          display: "flex",
          margin: "10px 0px",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p style={{ fontWeight: "bold" }}>Products</p>
          {!addingProduct && (
            <button onClick={() => setAddingProduct(true)}>Add product</button>
          )}
          {addingProduct && (
            <form
              onSubmit={onSubmit}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <input
                name="name"
                value={product.name}
                onChange={onChange}
                required
                placeholder="Name"
              />
              <input
                name="description"
                value={product.description}
                onChange={onChange}
                placeholder="Description"
              />
              <input
                name="price"
                value={product.price}
                onChange={onChange}
                required
                placeholder="Price"
              />
              <button type="submit">Save</button>
              <button onClick={() => setAddingProduct(false)}>Close</button>
            </form>
          )}
          <div>
            {products.map((product) => (
              <div
                key={product._id}
                style={{
                  padding: "10px 0px",
                  borderBottom: "1px solid #e1e1e1",
                }}
              >
                <p style={{ fontWeight: "bold" }}>{product.name}</p>
                <p>{`${product.price} kr`}</p>
                <p>{product.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontWeight: "bold" }}>Incoming orders</p>
          {orders
            .slice()
            .reverse()
            .map((order) => (
              <OrderItem key={order._id} order={order} />
            ))}
        </div>
        <div>
          <p style={{ fontWeight: "bold" }}>Address</p>
          {!addingAddress && (
            <button onClick={() => setAddingAddress(true)}>
              Add/change address
            </button>
          )}
          {addingAddress && (
            <form
              onSubmit={addAddress}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <input
                name="street"
                value={address.street}
                onChange={onChangeAddress}
                required
                placeholder="Street"
              />
              <input
                name="zipCode"
                value={address.zipCode}
                onChange={onChangeAddress}
                required
                placeholder="Zipcode"
              />
              <input
                name="town"
                value={address.town}
                onChange={onChangeAddress}
                required
                placeholder="Town"
              />
              <input
                name="country"
                value={address.country}
                onChange={onChangeAddress}
                required
                placeholder="country"
              />
              <button type="submit">Save</button>
              <button onClick={() => setAddingAddress(false)}>Close</button>
            </form>
          )}
          <p>{address.street}</p>
          <p>{address.zipCode}</p>
          <p>{address.town}</p>
          <p>{address.country}</p>
        </div>
      </div>
    </>
  );
};

export default Account;
