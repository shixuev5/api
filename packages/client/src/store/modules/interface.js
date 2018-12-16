import api from "@/api/interface";
import * as types from "../types";

export default {
  state: {
    list: [],
  },
  getters: {},
  mutations: {
    [types.SET_INTERFACE_INFO](state, payload) {
      state.info = Object.assign({}, state.info, payload);
    },
    [types.SET_INTERFACE_LIST](state, payload) {
      state.list = payload;
    },
  },
  actions: {
    async [types.INTERFACE_CREATE]({ commit }, payload) {
      const response = await api.create(payload);
      commit(types.SET_INTERFACE_INFO, response);
    },
    async [types.INTERFACE_LIST]({commit, rootState }, id) {
      const response = await api.find({
        project_id: rootState.project.info._id,
        module_id: id
      });
      commit(types.SET_INTERFACE_LIST, response);
    },
    async [types.INTERFACE_INFO]({commit}, id) {
      const response = await api.findById(id);
      commit(types.SET_INTERFACE_INFO, response);
    },
    async [types.INTERFACE_UPDATE]({commit}, { _id, ...payload }) {
      const response = await api.update(_id, payload);
      commit(types.SET_INTERFACE_INFO, response);
    },
    async [types.INTERFACE_DELETE]({commit}, id) {
      await api.remove(id);
      commit(types.SET_INTERFACE_INFO, {});
    },
  }
};
