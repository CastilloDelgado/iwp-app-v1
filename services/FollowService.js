import axios from "../helpers/axiosConfig";

export const FollowService = {
  follow: (id) => axios.post(`/follow/${id}`),
  unfollow: (id) => axios.post(`/unfollow/${id}`),
  isFollowing: (id) => axios.post(`/is_following/${id}`),
};
