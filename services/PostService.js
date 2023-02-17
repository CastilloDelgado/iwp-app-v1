import axios from "../helpers/axiosConfig";

const PostService = {
  getPosts: (page) => axios.get(`/posts?page=${page}`),
  getAllPosts: (page) => axios.get(`/posts_all?page=${page}`),
  getPostById: (id) => axios.get(`/posts/${id}`),
  getPostsByUserId: (id, page) => axios.get(`/users/${id}/posts?page=${page}`),
  createPost: (post) =>
    axios.post(`/posts`, post, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deletePost: (id) => axios.delete(`/posts/${id}`),
};

export default PostService;
