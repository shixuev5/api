<template>
  <a-input-search placeholder="搜索" @search="onSearch" />
</template>

<script>
export default {
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
