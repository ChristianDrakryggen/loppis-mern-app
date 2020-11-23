import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const [user, setUser] = useState({ username: "", password: "" });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(user));
    authContext.setIsAuthenticated(true);
    history.push("/account");
  };

  console.log(user);

  return (
    <div>
      <h1>Login</h1>
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
          value={user.password}
          onChange={onChange}
          required
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
