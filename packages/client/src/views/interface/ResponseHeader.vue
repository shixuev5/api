<template>
  <a-table
    :columns="columns"
    :dataSource="dataSource"
    :pagination="false"
    size="small"
  >
    <template slot="name" slot-scope="text, record">
      <a-input v-model="record.name" />
    </template>
    <template slot="value" slot-scope="text, record">
      <a-input v-model="record.value" />
    </template>
    <template slot="desc" slot-scope="text, record">
      <a-input v-model="record.desc" />
    </template>
    <template slot="operation" slot-scope="text, record, index">
      <a-icon
        v-if="index !== dataSource.length - 1"
        type="delete"
        @click="onClick(index)"
      />
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
          scopedSlots: { customRender: "value" }
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
  computed: {
    isModify() {
      const item = this.dataSource[this.dataSource.length - 1];
      return Boolean(Object.values(item).join(""));
    }
  },
  watch: {
    isModify(val) {
      if (val) {
        this.dataSource.push({
          name: "",
          value: "",
          desc: ""
        });
      }
    }
  },
  methods: {
    onClick(index) {
      this.dataSource.splice(index, 1);
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .ant-table-small {
  border: none;
}
</style>
