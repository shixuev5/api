import { verifyJwt, decodeJwt } from "@/utils/auth";
import user from "@/api/user";
import * as types from "../types";

export default {
  state: {
    isLogin: verifyJwt(),
    info: null
  },
  getters: {},
  mutations: {
    [types.SET_USER_LOGIN_STATUS](state, payload) {
      if (!payload) {
        localStorage.removeItem("api-token");
        sessionStorage.removeItem("api-item");
      }
      state.isLogin = payload;
    },
    [types.SET_USER_INFO](state, payload) {
      state.info = Object.assign({}, state.info, payload);
    }
  },
  actions: {
    async [types.USER_LOGIN]({ commit }, payload) {
      const { token } = await user.login(payload);
      payload.remember
        ? localStorage.setItem("api-token", token)
        : sessionStorage.setItem("api-token", token);
      commit(types.SET_USER_LOGIN_STATUS, true);
    },
    [types.USER_EXSIT]({ commit }, payload) {
      return user.exist(payload);
    },
    [types.USER_CREATE]({ commit }, payload) {
      return user.create(payload);
    },
    async [types.USER_UPDATE]({ state, commit }, payload) {
      const response = await user.update(state.info._id, payload);
      commit(types.SET_USER_INFO, response);
    },
    async [types.USER_INFO]({ commit }) {
      const { _id } = decodeJwt();
      const response = await user.findById(_id);
      commit(types.SET_USER_INFO, response);
    }
  }
};
