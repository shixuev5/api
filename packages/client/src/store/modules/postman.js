import * as types from "../types";
import { createInterface, sendRequest } from "@/utils/postman";

const api = createInterface();

export default {
  state: {
    activeKey: api._id,
    history: [],
    list: [api]
  },
  getters: {},
  mutations: {
    [types.SET_POSTMAN_ACTIVE_KEY](state, payload) {
      state.activeKey = payload;
    },
    [types.SET_POSTMAN_LIST](state, payload) {
      state.list = payload;
    },
    [types.UPDATE_POSTMAN_LIST](state, payload) {
      const api = state.list.find(item => item._id === payload._id);
      api ? Object.assign(api, payload) : state.list.unshift(payload);
    },
    [types.DELETE_POSTMAN_LIST](state, { _id }) {
      const index = state.list.findIndex(item => item._id === _id);
      if (index >= 0) {
        state.list.splice(index, 1);
        state.activeKey = (state.list[index] || state.list[index - 1])._id;
      }
    }
  },
  actions: {
    [types.POSTMAN_CREATE]({ commit }) {
      const api = createInterface();
      commit(types.UPDATE_POSTMAN_LIST, api);
      commit(types.SET_POSTMAN_ACTIVE_KEY, api._id);
    },
    [types.POSTMAN_UPDATE]({ commit }, payload) {
      commit(types.UPDATE_POSTMAN_LIST, payload);
    },
    [types.POSTMAN_DELETE]({ commit }, payload) {
      commit(types.DELETE_POSTMAN_LIST, payload);
    },
    async [types.POSTMAN_SEND]({ dispatch, state }, payload) {
      const api = state.list.find(item => item.key === payload);
      const response = await sendRequest(api);
      console.log(response);
    }
  }
};
