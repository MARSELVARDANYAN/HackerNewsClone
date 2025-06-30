import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', 
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const postSubmit = (formData) => {
  const token = localStorage.getItem('token');
  return API.post('/submit', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getJobPageById = (id) => API.get(`/job/${id}`);

export const getJobs = () => API.get('/job');

export const getShowPageById = (id) => API.get(`/show/${id}`);

export const getShowPosts = () => API.get('/show');

export const postShow = (formData) => API.post('/createShow', formData);

export const getQuestionComments = (questionId) =>  API.get(`/quesComments/${questionId}`)

export const postQuestionComments = (formData) => API.post('/quesComments', formData);

export const postAsk = (formData) => API.post('/ask', formData);

export const getAsk = () => API.get('/ask');

export const getUser = () => API.get('/users');

export const registerUser = (formData) => API.post('/auth/register', formData);

export const loginUser = (formData) => API.post('/auth/login', formData);

export const fetchPosts = () => API.get('/posts');

export const getPostById = (id) => API.get(`/post/${id}`);

export const fetchPastPosts = (date) => API.get(`/posts/past?date=${date}`);

export const createComment = (postId, commentData) => API.post(`/posts/${postId}/comments`, commentData);

export const fetchAllComments = () => API.get('/all-comments');

export const postComment = (data) => API.post('/comments', data); 

export const getComments = (postId) => API.get(`/comments/${postId}`);

