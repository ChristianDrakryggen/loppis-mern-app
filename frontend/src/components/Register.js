import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({ username: "", password: "" });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(user));
    history.push("/login");
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
