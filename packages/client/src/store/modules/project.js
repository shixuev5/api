import project from "@/api/project";
import * as types from "../types";

export default {
  state: {
    info: {},
    owner: [],
    star: [],
    explore: []
  },
  getters: {},
  mutations: {
    [types.SET_PROJECT_INFO](state, payload) {
      state.info = Object.assign({}, state.info, payload);
    },
    [types.SET_PROJECT_OWNER](state, payload) {
      state.owner = payload;
    },
    [types.SET_PROJECT_STAR](state, payload) {
      state.star = payload;
    },
    [types.SET_PROJECT_EXPLORE](state, payload) {
      state.explore = payload;
    }
  },
  actions: {
    async [types.PROJECT_CREATE]({ commit }, payload) {
      const response = await project.create(payload);
      commit(types.SET_PROJECT_INFO, response);
      return response;
    },
    async [types.PROJECT_LIST]({ commit }, payload) {
      const response = await project.find(payload);
      if(payload.type) {
        commit(types[`SET_PROJECT_${payload.type.toUpperCase()}`], response);
      }
      return response;
    }
  }
};
