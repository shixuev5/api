<template>
  <a-tabs>
    <a-tab-pane tab="趋势" key="trend">暂无公开项目</a-tab-pane>
    <a-tab-pane tab="关注" key="star">暂无公开项目</a-tab-pane>
    <a-tab-pane tab="全部" key="all">暂无公开项目</a-tab-pane>
    <span slot="tabBarExtraContent">
      <a-input-search placeholder="通过名称搜索" style="width: 200px" @search="onSearch"/>
      <a-select
        defaultValue="lastUpdate"
        style="width: 160px; marginLeft: 8px;"
        @change="handleChange"
      >
        <a-select-opt-group>
          <span slot="label">
            <a-icon type="swap"/>排序
          </span>
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
    </span>
  </a-tabs>
</template>

<script>
export default {
  methods: {
    onSearch() {},
    handleChange() {}
  }
};
</script>

<style lang="less">
.ant-select-dropdown-menu {
  max-height: 360px;
}
</style>
