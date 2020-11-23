import React from "react";
import { useHistory } from "react-router-dom";

const Store = (props) => {
  const history = useHistory();
  const { name, id } = props.store;

  const goToStore = (id) => {
    history.push(`/insidestore/${id}`);
  };

  return (
    <div
      style={{
        marginRight: "10px",
        border: "2px solid black",
        padding: "0px 20px 20px",
      }}
    >
      <h1>{name}</h1>
      <button onClick={() => goToStore(id)}>To store</button>
    </div>
  );
};

export default Store;
