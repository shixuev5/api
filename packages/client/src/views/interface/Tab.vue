<template>
  <a-tabs
    :activeKey="activeKey"
    @change="onChange"
    @edit="onRemove"
    type="editable-card"
    hideAdd
  >
    <a-tab-pane v-for="item in interfaces" :tab="item.name" :key="item._id">
      <Edit></Edit>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import * as types from "@/store/types";
import Edit from "./Edit";

export default {
  components: {
    Edit
  },
  data() {
    return {};
  },
  computed: {
    activeKey() {
      return this.$store.state.interface.activeKey;
    },
    interfaces() {
      return this.$store.state.interface.tabs;
    }
  },
  methods: {
    onChange(activeKey) {
      this.$store.commit(types.SET_INTERFACE_ACTIVE_KEY, activeKey);
    },
    onRemove(targetKey, action) {
      if (action === "remove") {
        this.$store.commit(types.DELETE_INTERFACE_TABS, { _id: targetKey });
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
