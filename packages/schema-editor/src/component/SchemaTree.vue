<template>
  <div v-bar class="schema-tree">
    <a-tree
      :selectedKeys.sync="expandedKeys"
      :treeData="treeData"
      defaultExpandAll
      v-on="$listeners"
    >
      <div slot="title" slot-scope="{ title }">{{ title }}</div>
    </a-tree>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  inject: ["store"],
  data() {
    return {
      treeData: this.store.treeData,
      expandedKeys: []
    };
  },
  methods: {},
  created() {
    console.log(this.treeData);
  }
};
</script>

<style lang="less" scoped>
/deep/ .ant-tree {
  li {
    padding: 0;
  }
  &-switcher {
    color: rgba(0, 0, 0, 0.65) !important;
  }
  &-node-content-wrapper {
    // width: calc(100% - 24px);
    padding: 0 !important;
    &.ant-tree-node-selected {
      color: rgba(0, 0, 0, 0.65) !important;
      &::before {
        background: #e6f7ff !important;
      }
    }
    .ant-tree-title {
      display: inline-block;
      // width: calc(100% - 24px);
    }
  }
  &-child-tree {
    .ant-tree-iconEle {
      color: #1890ff;
    }
    .ant-tree-title {
      width: 100%;
    }
  }
}
</style>
