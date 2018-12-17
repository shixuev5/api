import project from "@/api/project";
import * as types from "../types";

export default {
  state: {
    info: {},
    list: [],
  },
  getters: {},
  mutations: {
    [types.SET_PROJECT_INFO](state, payload) {
      state.info = payload;
    },
    [types.SET_PROJECT_LIST](state, payload) {
      state.list = payload;
    },
    [types.UPDATE_PROJECT_LIST](state, payload) {
      const project = state.list.find(item => item._id === payload._id);
      project ? Object.assign(project, payload) : state.list.unshift(payload);
    },
    [types.DELETE_PROJECT_LIST](state, { _id }) {
      const index = state.list.findIndex(item => item._id === _id);
      state.list.splice(index, 1);
    },
  },
  actions: {
    async [types.PROJECT_CREATE]({ commit }, payload) {
      const response = await project.create(payload);
      commit(types.SET_PROJECT_INFO, response);
      return response;
    },
    async [types.PROJECT_INFO]({commit}, id) {
      const response = await project.findById(id);
      commit(types.SET_PROJECT_INFO, response);
    },
    async [types.PROJECT_LIST]({commit }, id) {
      const response = await project.find({
        group_id: id
      });
      commit(types.SET_PROJECT_LIST, response);
    },
    async [types.PROJECT_UPDATE]({commit}, { id, ...payload }) {
      const response = await project.update(id, payload);
      commit(types.SET_PROJECT_INFO, response);
      commit(types.UPDATE_PROJECT_LIST, response);
    },
    async [types.PROJECT_STAR]({commit, rootState}, id) {
      const response = await project.star(id, { _id: rootState.user.info._id });
      commit(types.UPDATE_PROJECT_LIST, response);
    },
    async [types.PROJECT_UNSTAR]({commit, rootState}, id) {
      const response = await project.unStar(id, { _id: rootState.user.info._id });
      commit(types.UPDATE_PROJECT_LIST, response);
    },
    async [types.PROJECT_DELETE]({commit}, id) {
      await project.remove(id);
      commit(types.SET_PROJECT_INFO, {});
    },
  }
};
