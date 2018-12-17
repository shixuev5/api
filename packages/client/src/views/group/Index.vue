<template>
  <section>
    <div class="header">
      <h1>{{ info.name }}</h1>
      <p>{{ info.desc }}</p>
    </div>
    <div class="filter">
      <a-input-search
        v-model="condition.name"
        placeholder="通过名称搜索"
        style="width: 200px"
      />
      <div class="filter__right">
        <a-select
          v-model="condition.archive"
          style="width: 160px; marginLeft: 8px;"
        >
          <a-select-option value="false">隐藏归档项目</a-select-option>
          <a-select-option value="true">显示归档项目</a-select-option>
          <a-select-option value="only">只显示归档项目</a-select-option>
        </a-select>
        <a-select
          v-model="condition.sort"
          style="width: 120px; marginLeft: 8px;"
        >
          <a-select-option value="updatedAt|desc">最近更新</a-select-option>
          <a-select-option value="updatedAt|asc">最早更新</a-select-option>
          <a-select-option value="createdAt|desc">最近创建</a-select-option>
          <a-select-option value="createdAt|asc">最早创建</a-select-option>
        </a-select>
        <router-link :to="{ path: '/projects/new', query: { from: id } }">
          <a-button icon="plus" type="primary">新建项目</a-button>
        </router-link>
        <a-tooltip :title="showGrid ? '卡片展示' : '列表展示'" placement="top">
          <a-icon
            @click="showGrid = !showGrid"
            :type="showGrid ? 'appstore-o' : 'bars'"
          />
        </a-tooltip>
      </div>
    </div>
    <keep-alive>
      <component
        :is="showGrid ? 'Grid' : 'List'"
        :value="projects"
        type="project"
      ></component>
    </keep-alive>
  </section>
</template>

<script>
import Types from "vue-types";
import project from "@/api/project";
import * as types from "@/store/types";
import Grid from "./Grid";

export default {
  components: {
    Grid
  },
  props: {
    id: Types.string.isRequired
  },
  data() {
    return {
      condition: {
        name: "",
        sort: "updatedAt|desc",
        archive: "false"
      },
      showGrid: true
    };
  },
  computed: {
    info() {
      return this.$store.state.group.info;
    },
    projects() {
      return this.$store.state.project.list;
    }
  },
  methods: {
    onSearch() {},
    handleChange() {}
  },
  async created() {
    await this.$store.dispatch(types.GROUP_INFO, this.id);
    await this.$store.dispatch(types.PROJECT_LIST, this.info._id);
  }
};
</script>

<style lang="less" scoped>
section {
  max-width: 1280px;
  margin: 0 auto;

  .header {
    margin: 24px 0;
    text-align: center;
  }
  .filter {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    border-top: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;

    &__right {
      > * {
        margin-left: 8px;
      }
      .anticon {
        font-size: 16px;
        vertical-align: middle;
        cursor: pointer;
      }
    }
  }
}
</style>
