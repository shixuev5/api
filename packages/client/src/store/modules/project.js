import project from "@/api/project";
import * as types from "../types";

export default {
  state: {
    info: {},
    owner: [],
    star: [],
    explore: [],
  },
  getters: {},
  mutations: {
    [types.SET_PROJECT_INFO](state, payload) {
      state.info = Object.assign({}, state.info, payload);
    }
  },
  actions: {
    async [types.PROJECT_CREATE]({ commit }, payload) {
      const response = await project.create(payload);
      commit(types.SET_PROJECT_INFO, response);
      return response;
    },
    async [types.PROJECT_LIST]({commit}, type) {
      const response = await project.find({ type });
      commit(types[`SET_PROJECT_${type.toUppercase()}`], response);
    }
  }
};
