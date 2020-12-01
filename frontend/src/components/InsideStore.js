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

  //Sets the store state to the item in the Stores.getStores()-array to the item that has an id that matches the id from the url param
  useEffect(() => {
    setStore(storesData.find((store) => store.id.toString() === id));
  }, []);

  //Creates an array of ids retieved from the stores (store state) products array
  useEffect(() => {
    setStoreProductsIds(store.products);
  }, [store]);

  //Sets the products state to an array of products which ids mathes the ids from the storeProductIds (storeProductIds state) array
  useEffect(() => {
    if (storeProductsIds)
      setProducts(
        productsData.filter((product) =>
          storeProductsIds.some((id) => id === product.id)
        )
      );
  }, [storeProductsIds]);

  //Adds a product object to the cart and assigns it a counter property
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
            <p>{`${product.name} - ${product.price} kr`}</p>
            <button onClick={() => addToCart(product)}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsideStore;
