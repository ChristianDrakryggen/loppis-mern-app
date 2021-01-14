import React, { useState } from "react";
import ProductService from "../services/ProductService";

const Products = (props) => {
  const {
    authContext,
    setMessage,
    products,
    setProducts,
    removeProduct,
  } = props;

  const [product, setProduct] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
  });

  const [addingProduct, setAddingProduct] = useState(false);

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

  return (
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
            <button onClick={() => removeProduct(product)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
