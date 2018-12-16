import project from "@/api/project";
import * as types from "../types";

export default {
  state: {
    info: {},
  },
  getters: {},
  mutations: {
    [types.SET_PROJECT_INFO](state, payload) {
      state.info = Object.assign({}, state.info, payload);
    },
  },
  actions: {
    async [types.PROJECT_CREATE]({ commit }, payload) {
      const response = await project.create(payload);
      commit(types.SET_PROJECT_INFO, response);
    },
    async [types.PROJECT_INFO]({commit}, id) {
      const response = await project.findById(id);
      commit(types.SET_PROJECT_INFO, response);
    },
    async [types.PROJECT_UPDATE]({commit}, { _id, ...payload }) {
      const response = await project.update(_id, payload);
      commit(types.SET_PROJECT_INFO, response);
    },
    async [types.PROJECT_DELETE]({commit}, id) {
      await project.remove(id);
      commit(types.SET_PROJECT_INFO, {});
    },
  }
};
