<template>
  <a-table
    :columns="columns"
    :dataSource="dataSource"
    :expandedRowKeys="expandedRowKeys"
    :pagination="false"
    :scroll="{ y: height }"
    :customRow="
      record => ({
        on: {
          dblclick: ondblClick(record)
        }
      })
    "
    @expand="onExpand"
    rowKey="id"
    size="small"
  >
    <template slot="name" slot-scope="text, record">
      <span class="icon">{{ formatType(record.type) }}</span>
      <span>{{ text }}</span>
    </template>
    <template slot="desc" slot-scope="text, record">
      <MultiLine v-if="!isRoot(record)" v-model="record.description" />
    </template>
    <template slot="mock" slot-scope="text, record">
      <a-input v-if="!isRoot(record)" />
    </template>
    <template slot="required" slot-scope="text, record">
      <a-switch
        v-if="showRequired(record)"
        :checked="isRequired(record)"
        @change="checked => onChange(checked, record)"
      />
    </template>
  </a-table>
</template>

<script>
import Types from "vue-types";
import { formatType, schema2array, array2tree } from "./schema-util.js";

export default {
  props: {
    value: Types.object.isRequired,
    height: Types.number.def(600)
  },
  data() {
    return {
      formatType,
      columns: [
        {
          title: "名称",
          dataIndex: "title",
          width: "60%",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "描述",
          dataIndex: "description",
          align: "center",
          scopedSlots: { customRender: "desc" }
        },
        {
          title: "Mock",
          dataIndex: "mock",
          align: "center",
          width: 120,
          scopedSlots: { customRender: "mock" }
        },
        {
          title: "必须",
          dataIndex: "required",
          align: "center",
          width: 80,
          scopedSlots: { customRender: "required" }
        }
      ],
      dataSource: [],
      schemaList: [],
      expandedRowKeys: []
    };
  },
  watch: {
    value: {
      handler(val) {
        this.schemaList = schema2array(val);
        this.dataSource = array2tree(this.schemaList);
        this.schemaList.forEach(item => {
          if (!item.children.length) {
            delete item.children;
          } else {
            this.expandedRowKeys.push(item.id);
          }
        });
      },
      immediate: true
    }
  },
  methods: {
    showRequired(record) {
      return !this.isRoot(record) || record.title !== "items";
    },
    isRoot(record) {
      return Boolean(record.$schema);
    },
    isArrayItems(record) {
      if (record.parentId === 0) return true;
      const { type } = this.schemaList.find(
        item => item.id === record.parentId
      );
      return record.title === "items" && type === "array";
    },
    isRequired(record) {
      const parent = this.schemaList.find(item => item.id === record.parentId);
      return parent.required && parent.required.includes(record.title);
    },
    onChange(checked, record) {
      const parent = this.schemaList.find(item => item.id === record.parentId);
      if (parent.required) {
        checked
          ? parent.required.push(record.title)
          : parent.required.splice(parent.required.indexOf(record.title), 1);
      }
    },
    onExpand(expanded, record) {
      if (expanded) {
        this.expandedRowKeys.push(record.id);
      } else {
        this.expandedRowKeys.splice(this.expandedRowKeys.indexOf(record.id), 1);
      }
    },
    onClick(record) {
      return () => {
        if (!record.children) return;
        this.onExpand(!this.expandedRowKeys.includes(record.id), record);
      };
    },
    ondblClick(record) {
      return () => {};
    }
  }
};
</script>

<style lang="less" scoped>
.ant-table-wrapper {
  min-height: 300px;
}
/deep/ .ant-table {
  &-row {
    cursor: pointer;
  }
  &-row:nth-child(odd) {
    background: #f5f5f5;
  }
  // &-row td {
  //   display: flex;
  //   align-items: center;
  //   border: none;
  //   cursor: pointer;
  // }
  &-row-expand-icon {
    margin-right: 0 !important;
  }
  .icon {
    margin: 0 8px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    display: inline-block;
    color: #1890ff;
  }
}
</style>
