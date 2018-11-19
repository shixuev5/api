<template>
  <a-dropdown placement="bottomRight">
    <a-menu slot="overlay">
      <a-menu-item>
        <a-icon type="user" /> 用户信息
      </a-menu-item>
      <a-menu-item>
        <a-icon type="setting" /> 系统设置
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item>
        <a-icon type="logout" /> 登出
      </a-menu-item>
    </a-menu>
    <div>
      <a-avatar icon="user"/><a-icon type="down" />
    </div>
  </a-dropdown>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.ant-dropdown-trigger {
  &:hover {
    cursor: pointer;
  }
}
</style>
