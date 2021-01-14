import React, { useState, useEffect } from "react";
import AddressService from "../services/AddressService";

const Address = (props) => {
  const { authContext, setMessage } = props;

  const [address, setAddress] = useState({
    id: null,
    street: "",
    zipCode: "",
    town: "",
    country: "",
  });
  const [addingAddress, setAddingAddress] = useState(false);
  const [changingAddress, setChangingAddress] = useState(false);

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

  const changeAddress = (e) => {
    e.preventDefault();
    AddressService.updateAddress(address).then((data) => {
      const { message } = data;
      if (!message.msgError) {
        AddressService.getAddress().then((data) => {
          setAddress(data.address);
          setMessage(message);
          setChangingAddress(false);
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
      AddressService.getAddress().then((data) => {
        if (data && data.address) {
          setAddress(data.address);
        }
      });
    }
  }, []);

  return (
    <div>
      <p style={{ fontWeight: "bold" }}>Address</p>
      {!addingAddress &&
        address.street === "" &&
        address.zipCode === "" &&
        address.town === "" &&
        address.country === "" && (
          <button onClick={() => setAddingAddress(true)}>Add address</button>
        )}
      {!changingAddress &&
        (address.street !== "" ||
          address.zipCode !== "" ||
          address.town !== "" ||
          address.country !== "") && (
          <button onClick={() => setChangingAddress(true)}>
            Change address
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
      {changingAddress && (
        <form
          onSubmit={changeAddress}
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
          <button onClick={() => setChangingAddress(false)}>Close</button>
        </form>
      )}
      <p>{address.street}</p>
      <p>{address.zipCode}</p>
      <p>{address.town}</p>
      <p>{address.country}</p>
    </div>
  );
};

export default Address;
