import api from "@/api/interface";
import * as types from "../types";

export default {
  state: {
    activeKey: "",
    list: [],
    tabs: []
  },
  getters: {},
  mutations: {
    [types.SET_INTERFACE_ACTIVE_KEY](state, payload) {
      state.activeKey = payload;
    },
    [types.SET_INTERFACE_LIST](state, payload) {
      state.list = payload;
    },
    [types.UPDATE_INTERFACE_LIST](state, payload) {
      const item = state.list.find(item => item._id === payload._id);
      item ? Object.assign(item, payload) : state.list.unshift(payload);
    },
    [types.DELETE_INTERFACE_LIST](state, { _id }) {
      const index = state.list.findIndex(item => item._id === _id);
      state.tabs.splice(index, 1);
    },
    [types.SET_INTERFACE_TABS](state, payload) {
      state.tabs = payload;
    },
    [types.UPDATE_INTERFACE_TABS](state, payload) {
      const item = state.tabs.find(item => item._id === payload._id);
      item ? Object.assign(item, payload) : state.tabs.unshift(payload);
    },
    [types.DELETE_INTERFACE_TABS](state, { _id }) {
      const index = state.tabs.findIndex(item => item._id === _id);
      if (index >= 0) {
        state.tabs.splice(index, 1);
        state.activeKey = (state.tabs[index] || state.tabs[index - 1])._id;
      }
    }
  },
  actions: {
    async [types.INTERFACE_CREATE]({ commit }, payload) {
      const response = await api.create(payload);
      debugger;
      commit(types.SET_INTERFACE_LIST, state.list.concat([response]));
    },
    async [types.INTERFACE_LIST]({ commit, state, rootState }, id) {
      const response = await api.find(
        Object.assign(
          {
            project_id: rootState.project.info._id
          },
          id ? { module_id: id } : {}
        )
      );
      commit(types.SET_INTERFACE_LIST, state.list.concat(response));
      return response;
    },
    async [types.INTERFACE_INFO]({ commit }, id) {
      const response = await api.findById(id);
    },
    async [types.INTERFACE_UPDATE]({ commit }, { _id, ...payload }) {
      const response = await api.update(_id, payload);
    },
    async [types.INTERFACE_DELETE]({ commit }, id) {
      await api.remove(id);
    }
  }
};
