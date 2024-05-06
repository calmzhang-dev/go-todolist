// http.js
import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8088',
  timeout: 600000,
});

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = localStorage.getItem('todo_token'); // 替换为您的实际 token
  if (token) {
      config.headers.Authorization = `${token}`
  }
  return config;
}, function (error) {

  return Promise.reject(error);
});

const get = (url, params = {}) => {
  return http.get(url, { params });
}

const post = (url, data = {}) => {
  return http.post(url, data);
}

const put = (url, data = {}) => {
  return http.put(url, data);
}

const del = (url, params = {}) => {
               return http.delete(url, { params });
}



export default {
  get,
  post,
  put,
  del
};

