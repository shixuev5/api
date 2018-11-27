import axios from "axios";
import router from "@/router";
import { message } from "ant-design-vue";

const fetch = axios.create({
  baseURL: "/api/v1",
  timeout: 0
});

fetch.interceptors.request.use(
  config => {
    const token = localStorage.getItem('api-token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
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
    // 0 默认成功 不提示 1 成功(提示) 2 提示 3 警告  其他 错误
    switch (response.data.code) {
      case 0:
        return response.data.data;
      case 1:
        message.success(response.data.msg);
        return response.data.data;
      case 2:
        message.info(response.data.msg);
        return response.data.data;
      case 3:
        message.warn(response.data.msg);
        return response.data.data;
      default:
        message.error(response.data.msg);
        return Promise.reject(response);
    }
  },
  error => {
    if(error.response.status === 401) {
      router.replace('/login', function() {
        message.info('未授权，请重新登陆');
      })
    } else {
      message.error(`${error.response.status} ${error.response.statusText}`);
    }
    return Promise.reject(error);
  }
);

export default fetch;
