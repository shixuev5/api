<template>
  <a-input-search placeholder="搜索" @search="onSearch" />
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.state.user.isLogin;
    }
  },
  methods: {
    onSearch() {}
  }
};
</script>

<style lang="less" scoped>
.ant-input-search {
  width: 200px;
}
</style>
