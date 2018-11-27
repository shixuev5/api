<template>
  <a-dropdown v-if="isLogin" placement="bottomRight">
    <a-icon type="plus-square" />
    <a-menu slot="overlay">
      <a-menu-item>
        <router-link to="/projects/new">新建项目</router-link>
      </a-menu-item>
      <a-menu-item>
        <router-link to="/groups/new">新建群组</router-link>
      </a-menu-item>
      <a-menu-item>
        <router-link to="/interfaces/new">新建接口</router-link>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.state.user.isLogin;
    }
  }
};
</script>

<style lang="less" scoped>
.anticon {
  cursor: pointer;
  font-size: 24px;
}
/deep/ .ant-dropdown-menu-item {
  width: 160px;
}
</style>
