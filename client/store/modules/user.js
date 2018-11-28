import { verifyJwt, decodeJwt } from "@/utils/auth";
import * as user from "@/api/user";
import * as types from "../types";

export default {
  state: {
    isLogin: verifyJwt(),
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
      const { token } = await fetch.put("user", payload);
      payload.remember
        ? localStorage.setItem("api-token", token)
        : sessionStorage.setItem("api-token", token);
      commit(types.UPDATE_USER_LOGIN_STATUS, true);
    },
    [types.USER_SEARCH]({ commit }, payload) {
      return fetch.get("users", {
        params: payload
      });
    },
    [types.USER_SIGNUP]({ commit }, payload) {
      return fetch.post("users", payload);
    },
    async [types.USER_INFO]({ commit }) {
      const { _id } = decodeJwt();
      const response = await fetch.get(`users/${_id}`);
      commit(types.UPDATE_USER_INFO, response);
    }
  }
};
