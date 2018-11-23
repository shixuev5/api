<template>
  <a-layout-sider v-model="collapsed" theme="light" collapsible>
    <a-menu>
      <a-menu-item key="1">
        <a-icon type="mail" />
        <span>Navigation One</span>
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="calendar" />
        <span>Navigation Two</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <span slot="title">
          <a-icon type="appstore" />
          <span>Navigation Three</span>
        </span>
        <a-menu-item key="3">Option 3</a-menu-item>
        <a-menu-item key="4">Option 4</a-menu-item>
        <a-sub-menu key="sub1-2" title="Submenu">
          <a-menu-item key="5">Option 5</a-menu-item>
          <a-menu-item key="6">Option 6</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title">
          <a-icon type="setting" />
          <span>Navigation Four</span>
        </span>
        <a-menu-item key="7">Option 7</a-menu-item>
        <a-menu-item key="8">Option 8</a-menu-item>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false
    };
  }
};
</script>

<style lang="less" scoped>
.ant-layout-sider {
  height: calc(100vh - 50px);
  border-right: 1px solid #e8e8e8;
  /deep/ &-trigger {
    border-right: 1px solid #e8e8e8;
  }
}
.ant-menu:not(.ant-menu-inline-collapsed) {
  border-right: none;
}
</style>
