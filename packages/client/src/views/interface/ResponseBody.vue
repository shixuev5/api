<template>
  <div>
    <div style="margin: 8px 0; line-height: 24px;">
      <a-radio-group name="radioGroup" v-model="value.type">
        <a-radio value="json">json</a-radio>
        <a-radio value="text">text</a-radio>
        <a-radio value="blob">blob</a-radio>
        <a-radio value="arraybuffer">arraybuffer</a-radio>
        <a-radio value="document">document</a-radio>
      </a-radio-group>
    </div>
    <a-tabs v-show="value.type === 'json'" defaultActiveKey="json">
      <a-tab-pane tab="JSON" key="json">
        <MonacoEditor></MonacoEditor>
      </a-tab-pane>
      <a-tab-pane tab="Editor" key="editor">
        <SchemaEditor></SchemaEditor>
      </a-tab-pane>
      <a-tab-pane tab="Schema" key="schema">
        <MonacoEditor></MonacoEditor>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Types from "vue-types";

export default {
  props: {
    value: Types.object.def({
      type: "json"
    })
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
/deep/ .ant-table-small {
  border: none;
}
</style>
