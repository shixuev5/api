import axios from "axios";
import { message } from "ant-design-vue";

const fetch = axios.create({
  baseURL: "/api/v1",
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
    // 定义服务端 code 匹配不同 message 提示类型
    // if(!response.code) {
    //   return response.data;
    // }
    // todo: 处理服务端 错误提示
    return response.data;
  },
  error => {
    message.error(`${error.response.status} ${error.response.statusText}`);
    return Promise.reject(error);
  }
);

export default fetch;
