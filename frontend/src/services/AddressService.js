export default {
  newAddress: (address) => {
    return fetch("/users/user/newaddress", {
      method: "post",
      body: JSON.stringify(address),
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
  updateAddress: (address) => {
    return fetch("/users/user/updateaddress", {
      method: "put",
      body: JSON.stringify(address),
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
  getAddress: () => {
    return fetch("users/user/getaddress").then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { message: { msgBody: "Unauthorized", msgError: true } };
      }
    });
  },
};
