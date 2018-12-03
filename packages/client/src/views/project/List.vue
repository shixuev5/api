<template>
  <a-tabs :activeKey="activeKey" @change="onChange">
    <a-tab-pane tab="我的项目" key="owner">
      <a-tabs>
        <a-tab-pane tab="全部" key="all">
          <List :value="listValue"></List>
        </a-tab-pane>
        <a-tab-pane tab="个人" key="person">
          <List :value="listValue"></List>
        </a-tab-pane>
      </a-tabs>
    </a-tab-pane>
    <a-tab-pane tab="关注项目" key="star">
      <List :value="listValue"></List>
    </a-tab-pane>
    <a-tab-pane tab="探索项目" key="explore">
      <a-tabs>
        <a-tab-pane tab="趋势" key="trend">
          <List :value="listValue"></List>
        </a-tab-pane>
        <a-tab-pane tab="关注" key="star">
          <List :value="listValue"></List>
        </a-tab-pane>
        <a-tab-pane tab="全部" key="all">
          <List :value="listValue"></List>
        </a-tab-pane>
        <span slot="tabBarExtraContent">
          <a-select
            defaultValue="all"
            style="width: 120px"
            @change="handleChange"
          >
            <a-select-opt-group label="权限">
              <a-select-option value="all">全部</a-select-option>
              <a-select-option value="private">私有</a-select-option>
              <a-select-option value="shared">内部</a-select-option>
              <a-select-option value="public">公开</a-select-option>
            </a-select-opt-group>
          </a-select>
        </span>
      </a-tabs>
    </a-tab-pane>
    <span slot="tabBarExtraContent">
      <a-input-search
        v-model="filter.name"
        placeholder="通过名称搜索"
        style="width: 200px"
      />
      <a-select
        v-model="filter.sort"
        mode="multiple"
        style="width: 160px; marginLeft: 8px;"
      >
        <a-select-opt-group>
          <span slot="label"> <a-icon type="swap" />排序 </span>
          <a-select-option value="updatedAt|desc">最近更新</a-select-option>
          <a-select-option value="updatedAt|asc">最久更新</a-select-option>
          <a-select-option value="createdAt|desc">最近创建</a-select-option>
          <a-select-option value="createdAt|asc">最久创建</a-select-option>
        </a-select-opt-group>
        <a-select-opt-group label="归档">
          <a-select-option value="achive|false">隐藏归档项目</a-select-option>
          <a-select-option value="achive|true">显示归档项目</a-select-option>
          <a-select-option value="achive|true|only"
            >只显示归档项目</a-select-option
          >
        </a-select-opt-group>
      </a-select>
      <router-link to="/projects/new">
        <a-button type="primary" style="marginLeft: 8px;">新建项目</a-button>
      </router-link>
    </span>
  </a-tabs>
</template>

<script>
import { mapState } from "vuex";
import Types from "vue-types";
import Fuse from "fuse.js";
import * as types from "@/store/types";

function initFilter() {
  return {
    name: "",
    sort: "updatedAt|desc"
  };
}

export default {
  props: {
    type: Types.string.def("owner")
  },
  data() {
    return {
      filter: initFilter()
    };
  },
  computed: {
    ...mapState(["project"]),
    activeKey() {
      return this.type ? this.type : "owner";
    },
    listValue() {
      const [key, sortord] = this.filter.sort.split("|");
      const sortFn = (a, b) =>
        sortord === "desc" ? b[key] - a[key] : a[key] - b[key];
      if (this.filter.name) {
        const fuse = new Fuse(this.project[this.activeKey], {
          keys: ["name", "desc"]
        });
        return fuse.search(this.filter.name).sort(sortFn);
      } else {
        return this.project[this.activeKey].slice().sort(sortFn);
      }
    }
  },
  watch: {
    type: {
      handler(val) {
        this.$store.dispatch(types.PROJECT_LIST, val);
      },
      immediate: true
    }
  },
  methods: {
    onChange(key) {
      this.filter = initFilter();
      this.$router.push({ path: "/projects", query: { type: key } });
    },
    handleChange() {}
  }
};
</script>

<style lang="less">
.ant-tabs-bar {
  margin: 0;
}
.ant-select-dropdown-menu {
  max-height: 360px;
}
</style>
