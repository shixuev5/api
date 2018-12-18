<template>
  <a-table
    :columns="columns"
    :dataSource="dataSource"
    :pagination="false"
    size="small"
  >
    <template slot="name" slot-scope="text, record">
      <a-input :value="record.name" disabled />
    </template>
    <template slot="example" slot-scope="text, record">
      <MultiLine v-model="record.example"></MultiLine>
    </template>
    <template slot="desc" slot-scope="text, record">
      <a-input v-model="record.desc" />
    </template>
  </a-table>
</template>

<script>
import Types from "vue-types";
import cloneDeep from "lodash-es/cloneDeep";

export default {
  props: {
    value: Types.array.def([
      {
        name: "",
        example: "",
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
      dataSource: cloneDeep(this.value)
    };
  },
  computed: {
    isModify() {
      const item = this.dataSource[this.dataSource.length - 1];
      return Boolean(Object.values(item).join(""));
    }
  },
  watch: {
    dataSource: {
      handler(val) {
        this.$emit("input", val);
      },
      deep: true
    },
    isModify(val) {
      if (val) {
        this.dataSource.push({
          name: "",
          example: "",
          desc: ""
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .ant-table-small {
  border: none;
}
</style>
