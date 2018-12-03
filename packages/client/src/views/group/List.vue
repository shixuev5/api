<template>
  <a-tabs :activeKey="activeKey" @change="onChange">
    <a-tab-pane tab="我的群组" key="owner">
      <List :value="listValue"></List>
    </a-tab-pane>
    <a-tab-pane tab="探索群组" key="explore">
      <List :value="listValue"></List>
    </a-tab-pane>
    <span slot="tabBarExtraContent">
      <a-input-search
        v-model="filter.name"
        placeholder="通过名称搜索"
        style="width: 200px"
      />
      <a-select v-model="filter.sort" style="width: 160px; marginLeft: 8px;">
        <a-select-opt-group>
          <span slot="label"> <a-icon type="swap" />排序 </span>
          <a-select-option value="name|asc">名称升序</a-select-option>
          <a-select-option value="name|desc">名称降序</a-select-option>
          <a-select-option value="updatedAt|desc">最近更新</a-select-option>
          <a-select-option value="updatedAt|asc">最久更新</a-select-option>
          <a-select-option value="createdAt|desc">最近创建</a-select-option>
          <a-select-option value="createdAt|asc">最久创建</a-select-option>
        </a-select-opt-group>
      </a-select>
      <router-link to="/groups/new">
        <a-button type="primary" style="marginLeft: 8px;">新建群组</a-button>
      </router-link>
    </span>
  </a-tabs>
</template>

<script>
import { mapState } from "vuex";
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
    type: String
  },
  data() {
    return {
      filter: initFilter()
    };
  },
  computed: {
    ...mapState(["group"]),
    activeKey() {
      return this.type ? this.type : "owner";
    },
    listValue() {
      const [key, sortord] = this.filter.sort.split("|");
      const sortFn = (a, b) =>
        sortord === "desc" ? b[key] - a[key] : a[key] - b[key];
      const fuse = new Fuse(this.group[this.activeKey], {
        keys: ["name"],
        sortFn
      });
      return fuse.search(this.filter.name);
    }
  },
  watch: {
    type: {
      handler(val) {
        this.$store.dispatch(types.GROUP_LIST, val);
      },
      immediate: true
    }
  },
  methods: {
    onChange(key) {
      this.filter = initFilter();
      this.$router.push({ path: "/groups", query: { type: key } });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
