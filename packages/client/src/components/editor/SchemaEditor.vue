<template>
  <a-tabs>
    <a-tab-pane tab="JSON" key="JSON">
      <MonacoEditor :value="json"></MonacoEditor>
    </a-tab-pane>
    <a-tab-pane tab="Editor" key="Editor">
      <a-table
        :columns="columns"
        :dataSource="[schema]"
        :pagination="false"
        :showHeader="false"
        defaultExpandAllRows
        rowKey="$id"
        size="small"
        :scroll="{ y: height }"
      >
        <span
          class="table-custom-row"
          slot="custom"
          slot-scope="text, record"
          @click="record.show = true"
        >
          <span class="icon">{{ formatType(record.type) }}</span>
          <span>{{ text }}</span>
        </span>
      </a-table>
    </a-tab-pane>
    <a-tab-pane tab="Schema" key="Schema">
      <MonacoEditor :value="JSON.stringify(schema, null, 2)"></MonacoEditor>
    </a-tab-pane>
    <a-tab-pane tab="Mock" key="Mock">Content of tab 3</a-tab-pane>
  </a-tabs>
</template>

<script>
import Schema from "./generate-schema.js";
import { formatType } from "./schema-util.js";

export default {
  props: {
    value: {
      type: String,
      default: '""'
    },
    height: {
      type: Number,
      default: 600
    }
  },
  data() {
    return {
      formatType,
      json: this.value,
      columns: [
        {
          title: "title",
          dataIndex: "title",
          scopedSlots: { customRender: "custom" }
        }
      ]
    };
  },
  computed: {
    schema() {
      const instance = new Schema(this.value);
      instance.registerHook(node => {
        if (node.type === "array") {
          if (node.items) {
            node.children = Array.isArray(node.items)
              ? node.items
              : [node.items];
          }
        } else if (node.type === "object") {
          node.children = Object.values(node.properties);
        }
      });
      return instance.getSchema();
    }
  },
  methods: {}
};
</script>

<style lang="less" scoped>
/deep/ .ant-table {
  &-row td {
    display: flex;
    align-items: center;
    border: none;
    cursor: pointer;
  }
  &-row-expand-icon {
    margin-right: 0 !important;
  }
  .table-custom-row {
    flex: 1;
    .icon {
      margin: 0 8px;
      width: 20px;
      height: 20px;
      line-height: 20px;
      display: inline-block;
      text-align: center;
      color: #1890ff;
    }
  }
}
</style>
