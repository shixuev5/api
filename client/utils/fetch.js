import axios from "axios";
import { message } from "ant-design-vue";

const fetch = axios.create({
  baseURL: "http://127.0.0.1:7001/api/v1",
  timeout: 0
});

fetch.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    debugger;
    return Promise.reject(error);
  }
);

fetch.interceptors.response.use(
  response => {
    // todo: 处理服务端 错误提示
    return response.data;
  },
  error => {
    message.error(`${error.response.status} ${error.response.statusText}`);
    return Promise.reject(error);
  }
);

export default fetch;
