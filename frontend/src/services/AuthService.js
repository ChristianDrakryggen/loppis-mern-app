export default {
  register: (user) => {
    return fetch("/users/user/register", {
      method: "post",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  login: (user) => {
    return fetch("/users/user/login", {
      method: "post",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return {
          isAuthenticated: false,
          user: { _id: null, username: "" },
          message: { msgBody: "Unauthorized", msgError: true },
        };
      }
    });
  },
  logout: () => {
    return fetch("/users/user/logout")
      .then((res) => res.json())
      .then((data) => data);
  },
  isAuthenticated: () => {
    return fetch("/users/user/authenticated").then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return {
          isAuthenticated: false,
          user: { _id: null, username: "" },
          message: { msgBody: "Unauthorized", msgError: true },
        };
      }
    });
  },
};
