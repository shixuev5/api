<template>
  <main>
    <a-layout-sider v-model="collapsed" theme="light" collapsible>
      <a-menu :selectedKeys="selectedKeys" @select="onSelect">
        <a-menu-item v-for="item in menu" :key="item.key">
          <Icon :type="item.icon" :size="24" />
          <span>{{ item.name }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <aside><router-view name="aside"></router-view></aside>
    <div><router-view></router-view></div>
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
    }).def(() => [])
  },
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    selectedKeys() {
      const reg = new RegExp(`${this.$route.params.id}\\/?(.*)`);
      const key = this.$route.path.match(reg)[1];
      return this.menu.length ? [key ? key : this.menu[0].key] : [];
    }
  },
  methods: {
    onSelect({ key }) {
      if (key === this.menu[0].key) {
        this.$router.push(this.$route.path.replace(/\/\w+$/, ""));
      } else {
        this.$router.push({
          path: this.$route.path.endsWith(this.$route.params.id)
            ? `${this.$route.path}/${key}`
            : key
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
main {
  display: flex;
  align-items: stretch;
  height: calc(100vh - 48px);
  > div {
    flex: 1;
  }
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
