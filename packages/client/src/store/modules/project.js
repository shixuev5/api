import project from "@/api/project";
import * as types from "../types";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    [types.PROJECT_CREATE]({}, payload) {
      return project.create(payload);
    }
  }
};
