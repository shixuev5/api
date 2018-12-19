<template>
  <div>
    <div style="margin: 8px 0; line-height: 24px;">
      <a-radio-group name="radioGroup" @change="onChange" v-model="type">
        <a-radio value="none">none</a-radio>
        <a-radio value="json">json</a-radio>
        <a-radio value="formdata">form-data</a-radio>
        <a-radio value="urlencoded">x-www-form-urlencoded</a-radio>
        <a-radio value="raw">raw</a-radio>
        <a-radio value="binary">binary</a-radio>
      </a-radio-group>
      <a-select
        v-show="type === 'raw'"
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
          >Javascript(application/javascript)</a-select-option
        >
        <a-select-option value="application/xml"
          >XML(application/xml)</a-select-option
        >
        <a-select-option value="text/xml">XML(text/xml)</a-select-option>
        <a-select-option value="text/html">HTML(text/html)</a-select-option>
      </a-select>
    </div>
    <MonacoEditor v-if="type === 'json'"></MonacoEditor>
    <a-table
      v-if="type === 'formdata'"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="false"
      size="small"
    />
    <a-table
      v-if="type === 'urlencoded'"
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
      type: "none",
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
