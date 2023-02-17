import axios from "../helpers/axiosConfig";

export const AuthService = {
  login: (email, password) =>
    axios.post(`/login`, {
      email,
      password,
      device_name: "mobile",
    }),

  register: (name, usertag, email, password, passwordConfirmation) =>
    axios.post("/register", {
      name,
      usertag,
      email,
      password,
      password_confirmation: passwordConfirmation,
    }),

  logout: () => axios.post(`/logout`),
};
