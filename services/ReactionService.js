import axios from "../helpers/axiosConfig";

const ReactionService = {
  addReaction: (postId) => axios.post(`posts/${postId}/reaction`),
  removeReaction: (postId) => axios.delete(`posts/${postId}/reaction`),
};

export default ReactionService;
