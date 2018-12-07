<template>
  <a-tabs :activeKey="activeKey" @change="onTabChange">
    <a-tab-pane tab="我的项目" key="owner">
      <a-tabs defaultActiveKey="" @change="onTypeChange">
        <a-tab-pane tab="全部" key="">
          <List :value="listValue" type="project"></List>
        </a-tab-pane>
        <a-tab-pane tab="个人" key="person">
          <List :value="listValue" type="project"></List>
        </a-tab-pane>
      </a-tabs>
    </a-tab-pane>
    <a-tab-pane tab="关注项目" key="star">
      <List :value="listValue" type="project"></List>
    </a-tab-pane>
    <a-tab-pane tab="探索项目" key="explore">
      <a-tabs defaultActiveKey="" @change="onTypeChange">
        <a-tab-pane tab="趋势" key="trend">
          <List :value="listValue" type="project"></List>
        </a-tab-pane>
        <a-tab-pane tab="关注" key="star">
          <List :value="listValue" type="project"></List>
        </a-tab-pane>
        <a-tab-pane tab="全部" key="">
          <List :value="listValue" type="project"></List>
        </a-tab-pane>
        <span slot="tabBarExtraContent">
          <a-select v-model="condition.permission" style="width: 120px">
            <a-select-opt-group label="权限">
              <a-select-option value="">全部</a-select-option>
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
        v-model="condition.name"
        placeholder="通过名称搜索"
        style="width: 200px"
      />
      <a-select
        v-model="condition.archive"
        style="width: 160px; marginLeft: 8px;"
      >
        <a-select-option value="">显示归档项目</a-select-option>
        <a-select-option value="false">隐藏归档项目</a-select-option>
        <a-select-option value="only">只显示归档项目</a-select-option>
      </a-select>
      <a-select v-model="condition.sort" style="width: 120px; marginLeft: 8px;">
        <a-select-option value="updatedAt|desc">最近更新</a-select-option>
        <a-select-option value="updatedAt|asc">最早更新</a-select-option>
        <a-select-option value="createdAt|desc">最近创建</a-select-option>
        <a-select-option value="createdAt|asc">最早创建</a-select-option>
      </a-select>
      <router-link to="/projects/new">
        <a-button type="primary" style="marginLeft: 8px;">新建项目</a-button>
      </router-link>
    </span>
  </a-tabs>
</template>

<script>
import project from "@/api/project";
import Types from "vue-types";
import Fuse from "fuse.js";

function initCondition() {
  return {
    name: "",
    sort: "updatedAt|desc",
    archive: "",
    permission: ""
  };
}

export default {
  props: {
    tab: Types.string.def("owner"),
    type: Types.string.def("")
  },
  data() {
    return {
      projectList: [],
      condition: initCondition()
    };
  },
  computed: {
    activeKey() {
      return this.tab ? this.tab : "owner";
    },
    listValue() {
      let result = this.projectList;

      const [key, sortord] = this.condition.sort.split("|");
      const sortFn = (a, b) =>
        sortord === "desc" ? b[key] - a[key] : a[key] - b[key];

      if (this.condition.name) {
        const fuse = new Fuse(result, {
          keys: ["name", "desc"]
        });
        result = fuse.search(this.condition.name);
      }
      if (this.condition.permission !== "") {
        result = result.filter(
          item => item.permission === this.condition.permission
        );
      }
      if (this.condition.archive === "only") {
        result = result.filter(item => item.archive);
      } else if (this.condition.archive === "false") {
        result = result.filter(item => !item.archive);
      }

      return result.sort(sortFn);
    }
  },
  watch: {
    tab: {
      async handler(val) {
        this.projectList = await project.find({ tab: val });
      },
      immediate: true
    },
    async type(val) {
      this.projectList = await project.find({ tab: this.tab, type: val });
    }
  },
  methods: {
    onTabChange(key) {
      this.condition = initCondition();
      this.$router.push({ path: "/projects", query: { tab: key } });
    },
    onTypeChange(key) {
      this.condition.permission = "";
      this.$router.push({
        path: "/projects",
        query: { tab: this.tab, type: key }
      });
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
