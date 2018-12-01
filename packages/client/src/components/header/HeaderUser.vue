<template>
  <div>
    <a-dropdown v-if="$user.isLogin" placement="bottomRight">
      <a-menu @click="click" slot="overlay">
        <a-menu-item key="user"> <a-icon type="user" />用户信息 </a-menu-item>
        <a-menu-item key="setting">
          <a-icon type="setting" />系统设置
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="logout"> <a-icon type="logout" />登出 </a-menu-item>
      </a-menu>
      <div>
        <a-avatar icon="user" />
        <a-icon type="down" />
      </div>
    </a-dropdown>
    <a-button v-else type="primary" @click="click({ key: '/login' })"
      >登陆 / 注册</a-button
    >
  </div>
</template>

<script>
import * as types from "@/store/types";

export default {
  methods: {
    click({ key }) {
      if (key === "logout") {
        this.$store.commit(types.SET_USER_LOGIN_STATUS, false);
        this.$router.replace("/explore");
      } else {
        this.$router.push({ path: key });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.ant-dropdown-trigger {
  &:hover {
    cursor: pointer;
  }
}
</style>
