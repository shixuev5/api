<template>
  <div>
    <a-input-search placeholder="input search text" @search="onSearch"/>
    <a-tabs defaultActiveKey="2" @change="onChange">
      <a-tab-pane tab="历史" key="1">Content of Tab Pane 1</a-tab-pane>
      <a-tab-pane tab="项目" key="2" forceRender>
        <a-collapse accordion>
          <a-collapse-panel header="This is panel header 1" key="1">
            <p>234</p>
          </a-collapse-panel>
          <a-collapse-panel header="This is panel header 2" key="2">
            <p>123</p>
          </a-collapse-panel>
        </a-collapse>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  methods: {
    onSearch() {},
    onChange() {}
  }
};
</script>

<style lang="less" scoped>
</style>
