<template>
  <a-row>
    <a-col :span="4"> <Aside :value="postman.history"></Aside> </a-col>
    <a-col :span="18" :offset="1">
      <a-tabs v-model="activeKey" type="editable-card" hideAdd @edit="onEdit">
        <a-tab-pane v-for="item in postman.list" :key="item.key">
          <span slot="tab"><Method :type="item.method" />{{ item.name }}</span>
          <Request :value="item"></Request>
          <Response :value="item.response"></Response>
        </a-tab-pane>
        <a-button slot="tabBarExtraContent" @click="add">新增</a-button>
      </a-tabs>
    </a-col>
  </a-row>
</template>

<script>
import * as types from "@/store/types";
import Aside from "./Aside";
import Request from "./Request";
import Response from "./Response";

export default {
  components: {
    Aside,
    Request,
    Response
  },
  data() {
    return {};
  },
  computed: {
    activeKey: {
      get() {
        return this.$store.state.postman.activeKey;
      },
      set(val) {
        this.$store.commit(types.SET_POSTMAN_ACTIVE_KEY, val);
      }
    },
    postman() {
      return this.$store.state.postman;
    }
  },
  methods: {
    onEdit(targetKey, action) {
      this[action](targetKey);
    },
    add() {
      this.$store.dispatch(types.POSTMAN_CREATE);
    },
    remove(targetKey) {
      // 移除最后一个时，重置request对象
      this.$store.dispatch(types.POSTMAN_DELETE, targetKey);
    }
  }
};
</script>

<style lang="less" scoped>
.method {
  display: inline;
}
</style>
