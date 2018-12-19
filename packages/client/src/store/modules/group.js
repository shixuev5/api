import group from "@/api/group";
import * as types from "../types";

export default {
  state: {
    info: {}
  },
  getters: {},
  mutations: {
    [types.SET_GROUP_INFO](state, payload) {
      state.info = payload;
    }
  },
  actions: {
    async [types.GROUP_CREATE]({ commit }, payload) {
      const response = await group.create(payload);
      commit(types.SET_GROUP_INFO, response);
      return response;
    },
    async [types.GROUP_INFO]({ commit }, id) {
      const response = await group.findById(id);
      commit(types.SET_GROUP_INFO, response);
    },
    async [types.GROUP_UPDATE]({ commit }, { _id, ...payload }) {
      const response = await group.update(_id, payload);
      commit(types.SET_GROUP_INFO, response);
    },
    async [types.GROUP_DELETE]({ commit }, id) {
      await group.remove(id);
      commit(types.SET_GROUP_INFO, {});
    }
  }
};
