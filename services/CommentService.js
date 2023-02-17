import axios from "../helpers/axiosConfig";

const CommentService = {
  createComment: (postId, text) => axios.post(`/posts/${postId}`, { text }),
  deleteComment: (commentId) => axios.delete(`/comments/${commentId}`),
};

export default CommentService;
