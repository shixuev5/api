<template>
  <div>
    <p>
      {{ value.path }}
      <Clipboard v-show="value.path" :value="value.path"></Clipboard>
    </p>
    <a-row :gutter="16">
      <a-col :span="20">
        <a-input
          size="large"
          :value="path"
          @blur="pathBlur"
          @change="pathChange"
          placeholder="请输入请求 URL"
        >
          <a-select
            slot="addonBefore"
            :value="value.method"
            @select="methodSelect"
            style="width: 120px"
          >
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
        <a-button type="primary" size="large" @click="requestSend" block
          >发送</a-button
        >
      </a-col>
      <a-col :span="2">
        <a-button type="primary" size="large" @click="requestSave" block
          >保存</a-button
        >
      </a-col>
    </a-row>
    <a-tabs defaultActiveKey="params">
      <a-tab-pane tab="参数" key="params">
        <a-table
          :rowSelection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange
          }"
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
          :rowSelection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange
          }"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="false"
          size="small"
        />
      </a-tab-pane>
      <a-tab-pane
        tab="请求体"
        key="body"
        :disabled="value.method === 'GET'"
        forceRender
      >
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
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Types from "vue-types";
import * as types from "@/store/types";
import { resolveRequestParams, createRequestParams } from "@/utils/postman";

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
  props: {
    value: Types.object.def({
      path: "",
      method: "GET",
      request: {
        header: [],
        params: [],
        body: {}
      }
    })
  },
  data() {
    return {
      path: "",
      newTabIndex: 0,
      columns,
      dataSource,
      selectedRowKeys: []
    };
  },
  methods: {
    methodSelect(val) {
      this.$store.dispatch(types.POSTMAN_UPDATE, {
        key: this.value.key,
        method: val
      });
    },
    pathChange(e) {
      const { value } = e.target;
      const params = resolveRequestParams(value);
      if (params && params.length) {
        this.$store.dispatch(types.POSTMAN_UPDATE, {
          key: this.value.key,
          request: {
            params: createRequestParams(params)
          }
        });
      }
      this.path = value;
    },
    pathBlur() {
      this.$store.dispatch(types.POSTMAN_UPDATE, {
        key: this.value.key,
        path: this.path
      });
    },
    requestSend() {
      this.$store.dispatch(types.POSTMAN_SEND, this.value.key);
    },
    requestSave() {},
    onSelectChange() {},
    onChange() {},
    handleChange() {}
  }
};
</script>

<style lang="less">
.ant-table-small {
  border: none;
}
.ant-select-dropdown-menu {
  max-height: 300px;
}
</style>
