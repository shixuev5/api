import axios from "axios";
import nprogress from 'nprogress';
import router from "@/router";
import { message } from "ant-design-vue";

const fetch = axios.create({
  baseURL: "/api/v1",
  timeout: 0
});

fetch.interceptors.request.use(
  config => {
    nprogress.start();
    const token = localStorage.getItem('api-token') || sessionStorage.getItem('api-token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    nprogress.done();
    debugger;
    return Promise.reject(error);
  }
);

fetch.interceptors.response.use(
  response => {
    nprogress.done();
    if(response.data.code === 0) {
      return response.data.data;
    }
    message.error(response.data.msg);
    return Promise.reject(response);
  },
  error => {
    nprogress.done();
    if(error.response.status === 401) {
      router.replace('/login', function() {
        message.info('未授权，请重新登陆');
      })
    } else if(error.response.data.msg) {
      message.error(error.response.data.msg);
    } else {
      message.error(`${error.response.status} ${error.response.statusText}`);
    }
    return Promise.reject(error);
  }
);

export default fetch;
