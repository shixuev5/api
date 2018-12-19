<template>
  <a-table
    :columns="columns"
    :dataSource="value"
    :pagination="false"
    size="small"
  >
    <template slot="name" slot-scope="text, record">
      <a-input :value="record.name" disabled />
    </template>
    <template slot="example" slot-scope="text, record">
      <MultiLine v-model="record.example" :disabled="!record.name" />
    </template>
    <template slot="desc" slot-scope="text, record">
      <MultiLine v-model="record.desc" :disabled="!record.name" />
    </template>
  </a-table>
</template>

<script>
import Types from "vue-types";
import cloneDeep from "lodash-es/cloneDeep";

export default {
  props: {
    value: Types.array.def([])
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
          title: "示例",
          dataIndex: "example",
          width: "30%",
          scopedSlots: { customRender: "example" }
        },
        {
          title: "描述",
          dataIndex: "desc",
          scopedSlots: { customRender: "desc" }
        }
      ],
      dataSource: this.handleValue(this.value)
    };
  },
  watch: {
    value: {
      handler(val) {
        this.dataSource = this.handleValue(val);
      },
      deep: true
    },
    dataSource: {
      handler(val) {
        this.$emit("input", val.slice(0, -1));
      },
      deep: true
    }
  },
  methods: {
    handleValue(val) {
      return cloneDeep(val).concat({
        name: "",
        example: "",
        desc: ""
      });
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .ant-table-small {
  border: none;
}
</style>
