<template>
  <a-popover trigger="hover" placement="bottomLeft" arrowPointAtCenter>
    <div class="project" slot="content">
      <a-list size="small">
        <a-list-item>
         <router-link to="/projects" tag="span">我的项目</router-link>
        </a-list-item>
        <a-list-item>
          <router-link to="/projects" tag="span">关注项目</router-link>
        </a-list-item>
        <a-list-item>
          <router-link to="/projects" tag="span">探索项目</router-link>
        </a-list-item>
      </a-list>
      <a-divider type="vertical"/>
      <div class="project-result">
        <a-input-search placeholder="搜索您的项目" @search="onSearch"/>
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
.project {
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
