<template>
  <aside>
    <a-input-search placeholder="过滤" @search="onSearch" />
    <a-tabs defaultActiveKey="project" @change="onChange">
      <a-tab-pane tab="历史" key="history"> 暂无请求历史 </a-tab-pane>
      <a-tab-pane tab="项目" key="project"> </a-tab-pane>
    </a-tabs>
  </aside>
</template>

<script>
import Types from "vue-types";

export default {
  props: {
    value: Types.array.def([])
  },
  methods: {
    onSearch() {},
    onChange() {}
  }
};
</script>

<style lang="less" scoped>
aside {
  padding: 8px;
  /deep/ .ant-tabs-bar {
    text-align: center;
    margin-bottom: 0;
  }
  /deep/ .ant-tabs-nav {
    width: 100%;
  }
  /deep/ .ant-tabs-tab {
    width: 50%;
    margin-right: 0;
  }
}
</style>
