<template>
  <a-tabs :activeKey="activeKey" @change="onChange">
    <a-tab-pane tab="我的群组" key="owner">
      <List :value="listValue" type="group"></List>
    </a-tab-pane>
    <a-tab-pane tab="探索群组" key="explore">
      <List :value="listValue" type="group"></List>
    </a-tab-pane>
    <span slot="tabBarExtraContent">
      <a-input-search
        v-model="condition.name"
        placeholder="通过名称搜索"
        style="width: 200px"
      />
      <a-select v-model="condition.sort" style="width: 120px; marginLeft: 8px;">
        <a-select-option value="updatedAt|desc">最近更新</a-select-option>
        <a-select-option value="updatedAt|asc">最早更新</a-select-option>
        <a-select-option value="createdAt|desc">最近创建</a-select-option>
        <a-select-option value="createdAt|asc">最早创建</a-select-option>
      </a-select>
      <router-link to="/groups/new">
        <a-button type="primary" style="marginLeft: 8px;">新建群组</a-button>
      </router-link>
    </span>
  </a-tabs>
</template>

<script>
import Types from "vue-types";
import Fuse from "fuse.js";
import group from "@/api/group";

function initCondition() {
  return {
    name: "",
    sort: "updatedAt|desc"
  };
}

export default {
  props: {
    tab: Types.string.def("owner")
  },
  data() {
    return {
      groupList: [],
      condition: initCondition()
    };
  },
  computed: {
    activeKey() {
      return this.tab ? this.tab : "owner";
    },
    listValue() {
      const [key, sortord] = this.condition.sort.split("|");
      const sortFn = (a, b) =>
        sortord === "desc" ? b[key] - a[key] : a[key] - b[key];
      if (this.condition.name) {
        const fuse = new Fuse(this.groupList, {
          keys: ["name", "desc"]
        });
        return fuse.search(this.condition.name).sort(sortFn);
      } else {
        return this.groupList.slice().sort(sortFn);
      }
    }
  },
  watch: {
    tab: {
      async handler(val) {
        this.groupList = await group.find({ tab: val });
      },
      immediate: true
    }
  },
  methods: {
    onChange(key) {
      this.condition = initCondition();
      this.$router.push({ path: "/groups", query: { tab: key } });
    }
  }
};
</script>

<style lang="less" scoped>
.ant-tabs {
  /deep/ &-bar {
    margin: 0;
  }
}
</style>
