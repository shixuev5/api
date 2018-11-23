<template>
  <a-breadcrumb :routes="routes">
    <template slot="itemRender" slot-scope="{ route, params, routes, paths }">
      <router-link
        v-if="routes.indexOf(route) === routes.length - 1"
        :to="`/${paths.join('/')}`"
      >
        {{ route.alias }}
      </router-link>
    </template>
  </a-breadcrumb>
</template>

<script>
export default {
  watch: {
    $route: {
      handler() {
        this.routes = this.$route.matched.map(({ path, meta: { alias } }) => {
          return { path, alias };
        });
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
.ant-breadcrumb {
  padding: 16px 0;
  margin-bottom: 16px;
  border-bottom: 1px solid #e8e8e8;

  .router-link-exact-active {
    color: #000;
  }
}
</style>
