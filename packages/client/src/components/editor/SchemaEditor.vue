<template>
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
    <div
      class="table-custom-row"
      slot="custom"
      slot-scope="text, record"
      @click="record.show = true"
    >
      <span class="icon">{{ formatType(record.type) }}</span>
      <span>{{ text }}</span>
      <span class="right">{{ record.description }}</span>
      <!-- <a-tag class="right" v-if="record.required" color="blue">required</a-tag> -->
    </div>
  </a-table>
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
.ant-table-wrapper {
  min-height: 300px;
}
/deep/ .ant-table {
  &-row:nth-child(odd) {
    background: #f5f5f5;
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
