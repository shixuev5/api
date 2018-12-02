<template>
  <div class="group">
    <section>
      <div class="group-header">
        <h1>{{ group.name }}</h1>
        <p>{{ group.desc }}</p>
      </div>
      <div class="group-filter">
        <a-input-search
          placeholder="通过名称搜索"
          style="width: 200px"
          @search="onSearch"
        />
        <div class="group-filter__right">
          <a-select
            defaultValue="lastUpdate"
            style="width: 160px; marginLeft: 8px;"
            @change="handleChange"
          >
            <a-select-opt-group>
              <span slot="label"> <a-icon type="swap" />排序 </span>
              <a-select-option value="lastUpdate">最近更新</a-select-option>
              <a-select-option value="name">项目名</a-select-option>
              <a-select-option value="oldUpdate">最久更新</a-select-option>
              <a-select-option value="oldCreate">最久创建</a-select-option>
              <a-select-option value="lastCreate">最近创建</a-select-option>
            </a-select-opt-group>
            <a-select-opt-group label="归档">
              <a-select-option value="hide">隐藏归档项目</a-select-option>
              <a-select-option value="show">显示归档项目</a-select-option>
              <a-select-option value="onlyShow">只显示归档项目</a-select-option>
            </a-select-opt-group>
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
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
