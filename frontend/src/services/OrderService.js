export default {
  newOrder: (order) => {
    return fetch("/users/user/neworder", {
      method: "post",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { message: { msgBody: "Unauthorized", msgError: true } };
      }
    });
  },
  newOrderHistoryItem: (order) => {
    return fetch("/users/user/neworderhistoryitem", {
      method: "post",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { message: { msgBody: "Unautorized", msgError: true } };
      }
    });
  },
  getOrders: () => {
    return fetch("users/user/getorders").then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { message: { msgBody: "Unauthorized", msgError: true } };
      }
    });
  },
  getOrderHistory: () => {
    return fetch("users/user/getorderhistory").then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { message: { msgBody: "Unauthorized", msgError: true } };
      }
    });
  },
  removeOrder: (order) => {
    return fetch("/users/user/removeorder", {
      method: "post",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { message: { msgBody: "Unauthorized", msgError: true } };
      }
    });
  },
  handleOrder: (order) => {
    return fetch("/users/user/handleorder", {
      method: "put",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { message: { msgBody: "Unauthorized", msgError: true } };
      }
    });
  },
};
