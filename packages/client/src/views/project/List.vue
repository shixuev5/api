<template>
  <a-tabs :activeKey="activeKey" @change="onChange">
    <a-tab-pane tab="我的项目" key="owner">
      <a-tabs>
        <a-tab-pane tab="全部" key="all">
          <List :value="filter(project.owner)" type="project"></List>
        </a-tab-pane>
        <a-tab-pane tab="个人" key="person">
          <List :value="filter(ownerPerson)" type="project"></List>
        </a-tab-pane>
      </a-tabs>
    </a-tab-pane>
    <a-tab-pane tab="关注项目" key="star">
      <List :value="filter(project.star)" type="project"></List>
    </a-tab-pane>
    <a-tab-pane tab="探索项目" key="explore">
      <a-tabs>
        <a-tab-pane tab="趋势" key="trend">
          <List :value="filter(exploreTrend)" type="project"></List>
        </a-tab-pane>
        <a-tab-pane tab="关注" key="star">
          <List :value="filter(exploreStar)" type="project"></List>
        </a-tab-pane>
        <a-tab-pane tab="全部" key="all">
          <List :value="filter(project.explore)" type="project"></List>
        </a-tab-pane>
        <span slot="tabBarExtraContent">
          <a-select v-model="condition.permission" style="width: 120px">
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
        v-model="condition.name"
        placeholder="通过名称搜索"
        style="width: 200px"
      />
      <a-select
        v-model="condition.archive"
        style="width: 160px; marginLeft: 8px;"
      >
        <a-select-option value="false">隐藏归档项目</a-select-option>
        <a-select-option value="true">显示归档项目</a-select-option>
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
import { mapState } from "vuex";
import Types from "vue-types";
import Fuse from "fuse.js";
import * as types from "@/store/types";

function initCondition() {
  return {
    name: "",
    sort: "updatedAt|desc",
    archive: "true",
    permission: "all"
  };
}

export default {
  props: {
    type: Types.string.def("owner")
  },
  data() {
    return {
      condition: initCondition()
    };
  },
  computed: {
    ...mapState(["project"]),
    activeKey() {
      return this.type ? this.type : "owner";
    },
    ownerPerson() {
      return this.project.owner.filter(project =>
        project.members.some(
          member =>
            member._id === this.$user.info._id && member.role === "owner"
        )
      );
    },
    // TODO: 等待服务端实现项目活动统计
    exploreTrend() {
      return this.project.explore;
    },
    exploreStar() {
      return this.project.explore
        .slice()
        .sort((a, b) => a.stars.length - b.stars.length);
    }
  },
  watch: {
    type: {
      handler(val) {
        if (!this.cache) this.cache = [];
        if (!this.cache.includes(val)) {
          this.cache.push(val);
          this.$store.dispatch(types.PROJECT_LIST, { type: val });
        }
      },
      immediate: true
    }
  },
  methods: {
    filter(list) {
      let result = list.slice();

      const [key, sortord] = this.condition.sort.split("|");
      const sortFn = (a, b) =>
        sortord === "desc" ? b[key] - a[key] : a[key] - b[key];

      if (this.condition.name) {
        const fuse = new Fuse(result, {
          keys: ["name", "desc"]
        });
        result = fuse.search(this.condition.name);
      }
      if (this.condition.permission !== "all") {
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
    },
    onChange(key) {
      this.condition = initCondition();
      this.$router.push({ path: "/projects", query: { type: key } });
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
