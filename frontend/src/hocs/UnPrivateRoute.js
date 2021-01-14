import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const UnPrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authContext.isAuthenticated) {
          return (
            <Redirect
              to={{ pathname: "/account", state: { from: props.location } }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default UnPrivateRoute;
