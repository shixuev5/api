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
    <template slot="example" slot-scope="text, record">
      <a-input v-model="record.example" />
    </template>
    <template slot="desc" slot-scope="text, record">
      <a-input v-model="record.desc" />
    </template>
    <template slot="operation" slot-scope="text, record">
      <a-icon type="delete" />
    </template>
  </a-table>
</template>

<script>
import Types from "vue-types";

export default {
  props: {
    value: Types.array.def([
      {
        name: "",
        value: "",
        desc: ""
      }
    ])
  },
  data() {
    return {
      columns: [
        {
          title: "名称",
          dataIndex: "name",
          width: "20%",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "数值",
          dataIndex: "value",
          width: "30%",
          scopedSlots: { customRender: "example" }
        },
        {
          title: "描述",
          dataIndex: "desc",
          scopedSlots: { customRender: "desc" }
        },
        {
          title: "操作",
          dataIndex: "operation",
          width: 60,
          align: "center",
          scopedSlots: { customRender: "operation" }
        }
      ],
      dataSource: this.value
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
