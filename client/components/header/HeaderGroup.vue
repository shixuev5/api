<template>
  <a-popover trigger="hover" placement="bottomLeft" arrowPointAtCenter>
    <div class="group" slot="content">
      <a-list size="small">
        <a-list-item>我的群组</a-list-item>
        <a-list-item>探索群组</a-list-item>
      </a-list>
      <a-divider type="vertical" />
      <div class="group-result">
        <a-input-search placeholder="搜索您的群组" @search="onSearch" />
      </div>
    </div>
    <slot></slot>
  </a-popover>
</template>

<script>
export default {
  methods: {
    onSearch() {}
  }
};
</script>

<style lang="less" scoped>
.group {
  display: flex;
  height: 260px;
  .ant-list {
    width: 100px;
    &-item {
      cursor: pointer;
      &:hover {
        color: #1890ff;
      }
    }
  }
  .ant-divider {
    height: 100%;
  }
  &-result {
    width: 260px;
  }
}
</style>
