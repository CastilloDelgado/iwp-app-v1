import axios from "../helpers/axiosConfig";

export const ProfileService = {
  updateProfile: (name, caption) =>
    axios.post("/users", {
      name,
      caption,
    }),
  updateProfileImage: (image) =>
    axios.post("users/update_image", {
      image: image,
    }),
};
