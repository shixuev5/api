<template>
  <div>
    <a-radio-group name="radioGroup" @change="onChange" v-model="value">
      <a-radio value="none">none</a-radio>
      <a-radio value="formdata">form-data</a-radio>
      <a-radio value="urlencoded">x-www-form-urlencoded</a-radio>
      <a-radio value="raw">raw</a-radio>
      <a-radio value="binary">binary</a-radio>
    </a-radio-group>
    <a-select
      defaultValue="none"
      size="small"
      :dropdownMatchSelectWidth="false"
      @change="handleChange"
    >
      <a-select-option value="none">Text</a-select-option>
      <a-select-option value="text/plain">Text(text/plain)</a-select-option>
      <a-select-option value="application/json"
        >JSON(application/json)</a-select-option
      >
      <a-select-option value="application/javascript"
        >javascript(application/javascript)</a-select-option
      >
      <a-select-option value="application/xml"
        >XML(application/xml)</a-select-option
      >
      <a-select-option value="text/xml">XML(text/xml)</a-select-option>
      <a-select-option value="text/html">HTML(text/html)</a-select-option>
    </a-select>
    <a-table
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange
      }"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="false"
      size="small"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "none",
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
      dataSource: [],
      selectedRowKeys: []
    };
  },
  methods: {
    onChange() {},
    onSelectChange() {},
    handleChange() {}
  }
};
</script>

<style lang="less" scoped>
/deep/ .ant-table-small {
  border: none;
}
</style>
