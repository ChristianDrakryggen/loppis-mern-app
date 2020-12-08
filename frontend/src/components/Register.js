import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../services/AuthService";

const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({ username: "", password: "" });

  //message state to be used for snackbar notifications later
  const [message, setMessage] = useState(null);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.register(user).then((data) => {
      const { message } = data;
      setMessage(message);
      if (!message.msgError) {
        history.push("/login");
      }
    });
  };

  console.log(user);

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          value={user.username}
          onChange={onChange}
          required
          placeholder="Username"
        />
        <input
          name="password"
          type="password"
          value={user.password}
          onChange={onChange}
          required
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
