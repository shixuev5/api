<template>
  <div class="group">
    <section>
      <div class="group-header">
        <h1>{{ group.name }}</h1>
        <p>{{ group.desc }}</p>
      </div>
      <div class="group-filter">
        <a-input-search
          v-model="condition.name"
          placeholder="通过名称搜索"
          style="width: 200px"
        />
        <div class="group-filter__right">
          <a-select
            v-model="condition.achive"
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
          <a-button icon="plus" type="primary">新建项目</a-button>
          <a-tooltip
            :title="showGrid ? '卡片展示' : '列表展示'"
            placement="top"
          >
            <a-icon
              @click="showGrid = !showGrid"
              :type="showGrid ? 'appstore-o' : 'bars'"
            />
          </a-tooltip>
        </div>
      </div>
      <keep-alive>
        <component :is="showGrid ? 'Grid' : 'List'" type="project"></component>
      </keep-alive>
    </section>
  </div>
</template>

<script>
import Types from "vue-types";
import * as types from "@/store/types";

export default {
  props: {
    id: Types.string.required
  },
  data() {
    return {
      condition: {
        name: "",
        sort: "updatedAt|desc",
        achive: "false"
      },
      showGrid: true
    };
  },
  computed: {
    group() {
      return this.$store.state.group.info;
    }
  },
  methods: {
    onSearch() {},
    handleChange() {}
  },
  created() {
    this.$store.dispatch(types.GROUP_INFO, this.id);
  }
};
</script>

<style lang="less" scoped>
.group {
  flex: 1;
  section {
    max-width: 1280px;
    margin: 0 auto;
    text-align: center;
  }

  &-header {
    margin: 24px 0;
  }
  &-filter {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    margin-bottom: 16px;
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
