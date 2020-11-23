import React, { useState, useEffect, useContext } from "react";
import Stores from "../staticData/Stores";
import Products from "../staticData/Products";
import { BasketContext } from "../context/BasketContext";

const InsideStore = (props) => {
  const basketContext = useContext(BasketContext);

  const { id } = props.match.params;

  const [storesData, setStoresData] = useState(Stores.getStores());
  const [productsData, setProductsData] = useState(Products.getProducts());
  const [store, setStore] = useState({});
  const [storeProductsIds, setStoreProductsIds] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setStore(storesData.find((store) => store.id.toString() === id));
  }, []);

  useEffect(() => {
    setStoreProductsIds(store.products);
  }, [store]);

  useEffect(() => {
    if (storeProductsIds)
      setProducts(
        productsData.filter((product) =>
          storeProductsIds.some((id) => id === product.id)
        )
      );
  }, [storeProductsIds]);

  const addToCart = (product) => {
    const same = basketContext.basket.filter((item) => item === product);
    Object.assign(product, {
      count: same.length + 1,
    });
    basketContext.setBasket([...basketContext.basket, product]);
  };

  console.log(basketContext.basket);

  return (
    <div>
      <h1>{store.name}</h1>
      <h3>Products</h3>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <p>{product.name}</p>
            <button onClick={() => addToCart(product)}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsideStore;
