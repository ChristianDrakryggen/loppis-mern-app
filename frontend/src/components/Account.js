import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import ProductService from "../services/ProductService";

const Account = () => {
  const authContext = useContext(AuthContext);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [products, setProducts] = useState([]);
  const [addingProduct, setAddingProduct] = useState(false);

  //message state to be used for snackbar notifications later
  const [message, setMessage] = useState(null);

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

  useEffect(() => {
    if (authContext.user.username !== "") {
      ProductService.getMyProducts().then((data) => {
        if (data) {
          setProducts(data.products);
        }
      });
    }
  }, []);

  return (
    <>
      <h1>Account</h1>
      <p>{`Welcome ${authContext.user.username}`}</p>
      {!addingProduct && (
        <button onClick={() => setAddingProduct(true)}>Add product</button>
      )}
      {addingProduct && (
        <form onSubmit={onSubmit}>
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
            style={{ padding: "10px 0px", borderBottom: "1px solid #e1e1e1" }}
          >
            <p style={{ fontWeight: "bold" }}>{product.name}</p>
            <p>{`${product.price} kr`}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Account;
