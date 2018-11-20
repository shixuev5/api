<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="20">
        <a-input size="large" placeholder="请输入请求URL">
          <a-select slot="addonBefore" defaultValue="GET" dropdownClassName style="width: 120px">
            <a-select-option value="GET">GET</a-select-option>
            <a-select-option value="POST">POST</a-select-option>
            <a-select-option value="PUT">PUT</a-select-option>
            <a-select-option value="PATCH">PATCH</a-select-option>
            <a-select-option value="DELETE">DELETE</a-select-option>
            <a-select-option value="COPY">COPY</a-select-option>
            <a-select-option value="HEAD">HEAD</a-select-option>
            <a-select-option value="OPTIONS">OPTIONS</a-select-option>
          </a-select>
        </a-input>
      </a-col>
      <a-col :span="2">
        <a-button type="primary" size="large" block>发送</a-button>
      </a-col>
      <a-col :span="2">
        <a-button type="primary" size="large" block>保存</a-button>
      </a-col>
    </a-row>
    <a-tabs defaultActiveKey="params">
      <a-tab-pane tab="参数" key="params">
        <a-table
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="false"
          size="small"
        >
          <template slot="operation" slot-scope="text, record">
            <a-icon type="delete" />
          </template>
        </a-table>
      </a-tab-pane>
      <a-tab-pane tab="请求头" key="headers" forceRender>
        <a-table
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="false"
          size="small"
        />
      </a-tab-pane>
      <a-tab-pane tab="请求体" key="body" forceRender>
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
          change="handleChange"
        >
          <a-select-option value="none">Text</a-select-option>
          <a-select-option value="text/plain">Text(text/plain)</a-select-option>
          <a-select-option value="application/json">JSON(application/json)</a-select-option>
          <a-select-option value="application/javascript">javascript(application/javascript)</a-select-option>
          <a-select-option value="application/xml">XML(application/xml)</a-select-option>
          <a-select-option value="text/xml">XML(text/xml)</a-select-option>
          <a-select-option value="text/html">HTML(text/html)</a-select-option>
        </a-select>
        <a-table
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="false"
          size="small"
        />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
const columns = [
  {
    title: "键",
    dataIndex: "key"
  },
  {
    title: "值",
    dataIndex: "value"
  },
  {
    title: "描述",
    dataIndex: "description"
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];
const dataSource = [
  {
    key: "1",
    value: "John Brown",
    description: "New York No. 1 Lake Park"
  }
];

export default {
  data() {
    return {
      newTabIndex: 0,
      columns,
      dataSource,
      selectedRowKeys: [],
      value: "none"
    };
  },
  methods: {
    onSelectChange() {},
    onChange() {},
    handleChange() {}
  }
};
</script>

<style lang="less">
.ant-select-dropdown-menu {
  max-height: 300px;
}
</style>
