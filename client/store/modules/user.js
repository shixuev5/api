import fetch from "@/utils/fetch";
import * as types from "../types";
import io from "socket.io-client";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async [types.USER_LOGIN]({ commit }, payload) {
      const response = await fetch.post("users/login", payload);
    },
    async [types.USER_SEARCH]({ commit }, payload) {
      const response = await fetch.get("users/search", {
        params: payload
      });
    },
    async [types.USER_SIGNUP]({ commit }, payload) {
      const response = await fetch.post("users", payload);
    }
  }
};
