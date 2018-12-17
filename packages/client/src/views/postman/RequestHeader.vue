<template>
  <a-table
    :columns="columns"
    :dataSource="dataSource"
    :pagination="false"
    size="small"
  >
    <template slot="name" slot-scope="text, record">
      <HeaderFields></HeaderFields>
    </template>
  </a-table>
</template>

<script>
export default {
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
      ],
      dataSource: []
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
/deep/ .ant-table-small {
  border: none;
}
</style>
