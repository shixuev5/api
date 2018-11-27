import fetch from "@/utils/fetch";
import * as types from "../types";
import jwt from "jsonwebtoken";

export default {
  state: {
    isLogin:
      !!sessionStorage.getItem("api-token") ||
      !!localStorage.getItem("api-token"),
    info: null
  },
  getters: {},
  mutations: {
    [types.UPDATE_USER_LOGIN_STATUS](state, payload) {
      if (!payload) {
        localStorage.removeItem("api-token");
        sessionStorage.removeItem("api-item");
      }
      state.isLogin = payload;
    },
    [types.UPDATE_USER_INFO](state, payload) {
      state.info = payload;
    }
  },
  actions: {
    async [types.USER_LOGIN]({ commit, dispatch }, payload) {
      const { token } = await fetch.post("user/login", payload);
      payload.remember
        ? localStorage.setItem("api-token", token)
        : sessionStorage.setItem("api-token", token);
      commit(types.UPDATE_USER_LOGIN_STATUS, true);
    },
    [types.USER_SEARCH]({ commit }, payload) {
      return fetch.get("user/search", {
        params: payload
      });
    },
    [types.USER_SIGNUP]({ commit }, payload) {
      return fetch.post("user/signup", payload);
    },
    async [types.USER_INFO]({ commit }) {
      const token =
        sessionStorage.getItem("api-token") ||
        localStorage.getItem("api-token");
      // 存在安全问题 需要对token进行校验
      const { _id } = jwt.decode(token);
      const response = await fetch.get(`user/${_id}`);
      commit(types.UPDATE_USER_INFO, response);
    }
  }
};
