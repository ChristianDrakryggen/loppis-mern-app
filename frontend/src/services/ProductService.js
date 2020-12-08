export default {
  getProducts: (userId) => {
    return fetch("/users/user/getproducts", {
      method: "post",
      body: JSON.stringify(userId),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return res.json().then((data) => data);
    });
  },
  getMyProducts: () => {
    return fetch("/users/user/getmyproducts").then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { message: { msgBody: "Unauthorized", msgError: true } };
      }
    });
  },
  newProduct: (product) => {
    return fetch("users/user/newproduct", {
      method: "post",
      body: JSON.stringify(product),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { message: { msgBody: "Unauthorized", msgError: true } };
      }
    });
  },
};
