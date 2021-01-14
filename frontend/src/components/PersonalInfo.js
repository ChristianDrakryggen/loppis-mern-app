import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";

const PersonalInfo = (props) => {
  const { authContext, setMessage } = props;

  const [personalInfo, setPersonalInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });
  const [addingPersonalInfo, setAddingPersonalInfo] = useState(false);

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
          <p style={{ margin: "0px 5px 0px 5px" }}>{authContext.user.email}</p>
          <p style={{ margin: "0px 5px 0px 5px" }}>{authContext.user.phone}</p>
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
  );
};

export default PersonalInfo;
