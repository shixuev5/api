import module from "@/api/module";
import * as types from "../types";

export default {
  state: {
    info: {},
    list: [],
  },
  getters: {},
  mutations: {
    [types.SET_MODULE_INFO](state, payload) {
      state.info = payload;
    },
    [types.SET_MODULE_LIST](state, payload) {
      state.list = payload;
    },
    [types.UPDATE_MODULE_LIST](state, payload) {
      const module = state.list.find(item => item._id === payload._id);
      module ? Object.assign(module, payload) : state.list.unshift(payload);
    },
    [types.DELETE_MODULE_LIST](state, { _id }) {
      const index = state.list.findIndex(item => item._id === _id);
      state.list.splice(index, 1);
    },
  },
  actions: {
    async [types.MODULE_CREATE]({ commit, rootState }, payload) {
      const response = await module.create(Object.assign({
        project_id: rootState.project.info._id
      }, payload));
      commit(types.SET_MODULE_INFO, response);
      commit(types.UPDATE_MODULE_LIST, response);
    },
    async [types.MODULE_LIST]({commit, rootState }) {
      const response = await module.find({
        project_id: rootState.project.info._id
      });
      commit(types.SET_MODULE_LIST, response);
    },
    async [types.MODULE_INFO]({commit}, id) {
      const response = await module.findById(id);
      commit(types.SET_MODULE_INFO, response);
    },
    async [types.MODULE_UPDATE]({commit}, { _id, ...payload }) {
      const response = await module.update(_id, payload);
      commit(types.SET_MODULE_INFO, response);
    },
    async [types.MODULE_DELETE]({commit}, id) {
      await module.remove(id);
      commit(types.SET_MODULE_INFO, {});
    },
  }
};
