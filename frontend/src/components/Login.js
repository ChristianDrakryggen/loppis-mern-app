import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AuthService from "../services/AuthService";

const Login = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const [user, setUser] = useState({ username: "", password: "" });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.login(user).then((data) => {
      const { isAuthenticated, user } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        history.push("/account");
      }
    });
  };

  console.log(authContext.isAuthenticated);

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
          type="password"
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
