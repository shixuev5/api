import * as types from "../types";
import axios from "axios";
import { createInterface } from "@/utils/postman";

const api = createInterface();

export default {
  state: {
    activeKey: api.key,
    history: [],
    list: [api]
  },
  getters: {},
  mutations: {
    [types.SET_POSTMAN_ACTIVE_KEY](state, payload) {
      state.activeKey = payload;
    },
    [types.SET_POSTMAN_LIST](state, { type, payload }) {
      const actions = {
        create() {
          state.list.push(payload);
        },
        update() {
          const api = state.list.find(item => item.key === payload.key);
          Object.assign(api, payload);
        },
        delete() {
          const index = state.list.findIndex(item => item.key === payload);
          if (index >= 0) {
            state.list.splice(index, 1);
            state.activeKey = (state.list[index] || state.list[index - 1]).key;
          }
        }
      };
      actions[type]();
    }
  },
  actions: {
    [types.POSTMAN_CREATE]({ commit }) {
      const api = createInterface();
      commit(types.SET_POSTMAN_LIST, { type: "create", payload: api });
      commit(types.SET_POSTMAN_ACTIVE_KEY, api.key);
    },
    [types.POSTMAN_UPDATE]({ commit }, payload) {
      commit(types.SET_POSTMAN_LIST, { type: "update", payload });
    },
    [types.POSTMAN_DELETE]({ commit }, payload) {
      commit(types.SET_POSTMAN_LIST, { type: "delete", payload });
    },
    async [types.POSTMAN_SEND]({ dispatch, state }, payload) {
      const api = state.list.find(item => item.key === payload);
      let response;
      try {
        response = await axios({
          url: api.path,
          method: api.method,
        });
      } catch (error) {
        response = error;
      }
      // dispatch(types.POSTMAN_UPDATE, {
      //   type: "update",
      //   payload: {
      //     key: payload,
      //     response: {

      //     }
      //   }
      // });
    }
  }
};
