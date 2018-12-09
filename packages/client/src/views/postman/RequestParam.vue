<template>
  <a-table
    :rowSelection="{
      selectedRowKeys: selectedRowKeys,
      onChange: onSelectChange
    }"
    :columns="columns"
    :dataSource="value"
    :pagination="false"
    size="small"
  >
    <template slot="operation" slot-scope="text, record">
      <a-icon type="delete" />
    </template>
  </a-table>
</template>

<script>
import Types from "vue-types";

export default {
  props: {
    value: Types.array.def([])
  },
  data() {
    return {
      columns: [
        {
          title: "键",
          dataIndex: "name"
        },
        {
          title: "值",
          dataIndex: "value"
        },
        {
          title: "描述",
          dataIndex: "desc"
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ]
    };
  },
  methods: {
    selectedRowKeys() {},
    onSelectChange() {}
  }
};
</script>

<style lang="less" scoped></style>
