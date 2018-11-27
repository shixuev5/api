import fetch from "@/utils/fetch";
import * as types from "../types";
import md5 from 'spark-md5';
import jwt from 'jsonwebtoken';
import io from "socket.io-client";

export default {
  state: {
    isLogin: false,
    info: {}
  },
  getters: {

  },
  mutations: {
    [types.UPDATE_USER_LOGIN_STATUS](state, payload) {
      state.isLogin = payload;
    },
    [types.UPDATE_USER_INFO](state, payload) {
      state.info = payload;
    },
  },
  actions: {
    async [types.USER_LOGIN]({ commit, dispatch }, payload) {
      const { token } = await fetch.post("user/login", payload);
      localStorage.setItem('api-token', token);
      commit(types.UPDATE_USER_LOGIN_STATUS, true);
      const info = jwt.decode(token);
      dispatch(types.USER_INFO, info);
    },
    async [types.USER_SEARCH]({ commit }, payload) {
      return fetch.get("user/search", {
        params: payload
      });
    },
    async [types.USER_SIGNUP]({ commit }, payload) {
      payload.salt = payload.salt || 'api_secret';
      payload.password = md5.hash(md5.hash(payload.password) + payload.salt);
      await fetch.post("user/signup", payload);
    },
    async [types.USER_INFO]({ commit }, { _id }) {
      const response = await fetch.get(`user/${_id}`);
      commit(types.UPDATE_USER_INFO, response);
    }
  }
};
