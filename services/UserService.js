import axios from "../helpers/axiosConfig";

const UserService = {
  getUserById: (id) => axios.get(`/users/${id}`),
};

export default UserService;
