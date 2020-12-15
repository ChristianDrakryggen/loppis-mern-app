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
  getOrders: () => {
    return fetch("users/user/getorders").then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { message: { msgBody: "Unauthorized", msgError: true } };
      }
    });
  },
};
