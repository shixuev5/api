<template>
  <a-tabs>
    <a-tab-pane tab="我的群组" key="my">暂无公开群组</a-tab-pane>
    <a-tab-pane tab="探索公开群组" key="public">暂无公开群组</a-tab-pane>
    <span slot="tabBarExtraContent">
      <a-input-search
        placeholder="通过名称搜索"
        style="width: 200px"
        @search="onSearch"
      />
      <a-select
        defaultValue="lastUpdate"
        style="width: 160px; marginLeft: 8px;"
        @change="handleChange"
      >
        <a-select-opt-group>
          <span slot="label"> <a-icon type="swap" />排序 </span>
          <a-select-option value="nameAsc">名称升序</a-select-option>
          <a-select-option value="nameDesc">名称降序</a-select-option>
          <a-select-option value="lastUpdate">最近更新</a-select-option>
          <a-select-option value="oldUpdate">最久更新</a-select-option>
          <a-select-option value="lastCreate">最近创建</a-select-option>
          <a-select-option value="oldCreate">最久创建</a-select-option>
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

<style lang="less" scoped></style>
