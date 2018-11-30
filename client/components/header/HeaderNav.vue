<template>
  <a-menu class="header-nav" mode="horizontal">
    <a-menu-item key="projects">
      <HeaderProject v-if="$user.isLogin">项目</HeaderProject>
      <router-link v-else to="/explore/projects">项目</router-link>
    </a-menu-item>
    <a-menu-item key="groups">
      <HeaderGroup v-if="$user.isLogin">群组</HeaderGroup>
      <router-link v-else to="/explore/groups">群组</router-link>
    </a-menu-item>
    <a-menu-item key="postman">
      <router-link to="/postman">postman</router-link>
    </a-menu-item>
  </a-menu>
</template>

<script>
export default {};
</script>


<style lang="less" scoped>
</style>
