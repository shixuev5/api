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
    <template slot="example" slot-scope="text, record">
      <a-input v-model="record.example" />
    </template>
    <template slot="desc" slot-scope="text, record">
      <a-input v-model="record.desc" />
    </template>
    <template slot="required" slot-scope="text, record">
      <a-switch v-model="record.required" />
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
import cloneDeep from "lodash-es/cloneDeep";
import pick from "lodash-es/pick";

export default {
  props: {
    value: Types.array.def([
      {
        name: "",
        example: "",
        desc: "",
        required: true
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
        },
        {
          title: "必须",
          dataIndex: "required",
          width: 60,
          align: "center",
          scopedSlots: { customRender: "required" }
        },
        {
          title: "操作",
          dataIndex: "operation",
          width: 60,
          align: "center",
          scopedSlots: { customRender: "operation" }
        }
      ],
      dataSource: cloneDeep(this.value)
    };
  },
  computed: {
    isModify() {
      const item = this.dataSource[this.dataSource.length - 1];
      return Boolean(
        Object.values(pick(item, ["name", "example", "desc"])).join("")
      );
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
          desc: "",
          required: true
        });
      }
    }
  },
  methods: {
    onClick(index) {
      this.dataSource.splice(index, 1);
      this.$emit("input", this.dataSource);
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .ant-table-small {
  border: none;
}
</style>
