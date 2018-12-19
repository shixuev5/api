import axios from "axios";
import nprogress from "nprogress";
import qs from "qs";
import store from "@/store";
import router from "@/router";
import * as types from "@/store/types";
import { message } from "ant-design-vue";
import { readJwt } from "@/utils/auth";

const fetch = axios.create({
  baseURL: "/api/v1",
  timeout: 0,
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: "repeat" });
  }
});

fetch.interceptors.request.use(
  config => {
    nprogress.start();
    const token = readJwt();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    nprogress.done();
    return Promise.reject(error);
  }
);

fetch.interceptors.response.use(
  response => {
    nprogress.done();
    if (response.data.code === 0) {
      return response.data.data;
    }
    message.error(response.data.msg);
    return Promise.reject(response);
  },
  error => {
    nprogress.done();
    if (!error.response) {
      message.error(error.message);
    } else if (error.response.status === 401) {
      router.replace("/login", function() {
        message.info("未授权，请重新登陆");
      });
      store.commit(types.SET_USER_LOGIN_STATUS, false);
    } else if (error.response.data.msg) {
      message.error(error.response.data.msg);
    } else {
      message.error(`${error.response.status} ${error.response.statusText}`);
    }
    return Promise.reject(error);
  }
);

export default fetch;
