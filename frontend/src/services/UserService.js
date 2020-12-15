export default {
  getUsers: () => {
    return fetch("/users/getallusers").then((res) => {
      return res.json().then((data) => data);
    });
  },
  updateUser: (personalInfo) => {
    return fetch("/users/user/updateuser", {
      method: "put",
      body: JSON.stringify(personalInfo),
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
