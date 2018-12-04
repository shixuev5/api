import group from "@/api/group";
import * as types from "../types";

export default {
  state: {
    info: {},
    owner: [],
    explore: []
  },
  getters: {},
  mutations: {
    [types.SET_GROUP_INFO](state, payload) {
      state.info = Object.assign({}, state.info, payload);
    },
    [types.SET_GROUP_OWNER](state, payload) {
      state.owner = payload;
    },
    [types.SET_GROUP_EXPLORE](state, payload) {
      state.explore = payload;
    }
  },
  actions: {
    async [types.GROUP_CREATE]({ commit }, payload) {
      const response = await group.create(payload);
      commit(types.SET_GROUP_INFO, response);
      return response;
    },
    async [types.GROUP_INFO]({commit}, id) {
      const response = await group.findById(id);
      commit(types.SET_GROUP_INFO, response);
    },
    async [types.GROUP_LIST]({commit}, type) {
      const response = await group.find({ type });
      commit(types[`SET_GROUP_${type.toUpperCase()}`], response);
    }
  }
};
