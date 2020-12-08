export default {
  getUsers: () => {
    return fetch("/users/getallusers").then((res) => {
      return res.json().then((data) => data);
    });
  },
};
