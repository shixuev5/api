<template>
  <a-menu class="header-nav" mode="horizontal" @click="click">
    <a-menu-item key="projects">
      <HeaderProject>项目</HeaderProject>
    </a-menu-item>
    <a-menu-item key="groups">群组</a-menu-item>
    <a-menu-item key="postman">postman</a-menu-item>
  </a-menu>
</template>

<script>
export default {
  methods: {
    click({ key }) {
      this.$router.push({ name: key });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
