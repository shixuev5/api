<template>
  <aside>
    <a-layout-sider v-model="collapsed" theme="light" collapsible>
      <a-menu :defaultSelectedKeys="[config[0].key]">
        <a-menu-item v-for="item in config" :key="item.key">
          <Icon :type="item.icon" :size="24"/>
          <span>{{item.name}}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <Module></Module>
  </aside>
</template>

<script>
import config from "./config.js";
import Module from "./Module";

export default {
  components: {
    Module
  },
  data() {
    return {
      config,
      collapsed: false
    };
  }
};
</script>

<style lang="less" scoped>
aside {
  display: flex;
}
.ant-layout-sider {
  height: calc(100vh - 48px);
  border-right: 1px solid #e8e8e8;
  /deep/ &-trigger {
    border-right: 1px solid #e8e8e8;
  }
}
.ant-menu:not(.ant-menu-inline-collapsed) {
  border-right: none;
}
.ant-layout-sider-collapsed {
  .ant-menu-item {
    text-align: center;
    padding: 0 24px !important;
  }
  .icon {
    margin-right: 0;
  }
  .icon + span {
    display: none;
  }
}
.icon {
  vertical-align: middle;
  margin-right: 8px;
  & + span {
    vertical-align: middle;
  }
}
</style>
