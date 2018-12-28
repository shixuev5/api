<template>
  <a-tabs
    :activeKey="activeKey"
    @change="onChange"
    @edit="onRemove"
    type="editable-card"
    hideAdd
  >
    <a-tab-pane v-for="item in interfaces" :key="item._id">
      <span class="tab ellipsis" slot="tab"
        ><Method :type="item.method" />
        <a-badge v-if="item.isModify" dot status="warning">
          {{ item.name }}
        </a-badge>
        <template v-else>
          {{ item.name }}
        </template>
      </span>
      <Edit :value="item"></Edit>
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
        const { isModify } = this.interfaces.find(
          item => item._id === targetKey
        );
        if (isModify) {
          this.$confirm({
            title: "Do you Want to delete these items?",
            content: "Some descriptions",
            onOk() {
              console.log("OK");
            },
            onCancel() {
              console.log("Cancel");
            },
            class: "test"
          });
        } else {
          this.$store.commit(types.DELETE_INTERFACE_TABS, { _id: targetKey });
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.tab {
  display: inline-block;
  max-width: 160px;
  line-height: 20px;
  padding: 8px;
  vertical-align: middle;
}
</style>
