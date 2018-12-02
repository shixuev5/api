<template>
  <main>
    <a-layout-sider v-model="collapsed" theme="light" collapsible>
      <a-menu @select="onSelect" :defaultSelectedKeys="[menu[0].key]">
        <a-menu-item v-for="item in menu" :key="item.key">
          <Icon :type="item.icon" :size="24" />
          <span>{{ item.name }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <router-view></router-view>
  </main>
</template>

<script>
import Types from "vue-types";

export default {
  props: {
    menu: Types.arrayOf({
      key: String,
      icon: String,
      name: String
    }).def(() => [{ key: "" }])
  },
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    onSelect({ key }) {
      const reg = new RegExp(`${this.$route.params.id}\\/?(.*)`);
      const prev = this.$route.path.match(reg)[1];
      const path = this.$route.path.endsWith("/")
        ? this.$route.path.slice(0, -1)
        : this.$route.path;
      this.$router.push({
        path: prev ? key : `${path}/${key}`
      });
    }
  }
};
</script>

<style lang="less" scoped>
main {
  display: flex;
  align-items: stretch;
  height: calc(100vh - 48px);
}
.ant-layout-sider {
  border-right: 1px solid #e8e8e8;
  /deep/ &-trigger {
    border-right: 1px solid #e8e8e8;
  }
}
.ant-menu:not(.ant-menu-inline-collapsed) {
  border-right: none;
}
.ant-layout-sider-collapsed {
  .ant-menu-item {
    text-align: center;
    padding: 0 24px !important;
  }
  .icon {
    margin-right: 0;
  }
  .icon + span {
    display: none;
  }
}
.icon {
  vertical-align: middle;
  margin-right: 8px;
  & + span {
    vertical-align: middle;
  }
}
</style>
