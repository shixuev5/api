<template>
  <a-tabs size="small">
    <a-tab-pane tab="Editor" key="Editor">
      <a-table
        :columns="columns"
        :dataSource="dataSource"
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
          <Icon :type="record.type"></Icon> <span>{{ text }}</span>
          <div v-if="record.show" style="height: 200px"></div>
        </span>
      </a-table>
    </a-tab-pane>
    <a-tab-pane tab="Schema" key="Schema"> </a-tab-pane>
    <a-tab-pane tab="Mock" key="Mock">Content of tab 3</a-tab-pane>
  </a-tabs>
</template>

<script>
import Schema from "./utils/generate-schema.js";
import Icon from "./Icon";

export default {
  components: {
    Icon
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      default: 600
    }
  },
  data() {
    return {
      columns: [
        {
          title: "title",
          dataIndex: "title",
          scopedSlots: { customRender: "custom" }
        }
      ],
      showDetail: false
    };
  },
  computed: {
    dataSource() {
      const schema = new Schema(this.value);
      schema.registerHook(node => {
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
      return [schema.getSchema()];
    }
  },
  methods: {}
};
</script>

<style lang="less" scoped>
/deep/ .ant-table {
  &-small {
    border: none;
  }
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
  }
}
</style>
