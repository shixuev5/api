<template>
  <div>
    <div style="margin: 8px 0; line-height: 24px;">
      <a-radio-group name="radioGroup" v-model="value.type">
        <a-radio value="none">none</a-radio>
        <a-radio value="json">json</a-radio>
        <a-radio value="formdata">form-data</a-radio>
        <a-radio value="urlencoded">x-www-form-urlencoded</a-radio>
        <a-radio value="raw">raw</a-radio>
        <a-radio value="binary">binary</a-radio>
      </a-radio-group>
      <a-select
        v-show="value.type === 'raw'"
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
    <JsonEditor v-if="value.type === 'json'"></JsonEditor>
    <a-table
      v-if="value.type === 'formdata'"
      :columns="formColumns"
      :dataSource="dataSource"
      :pagination="false"
      size="small"
    >
      <template slot="name" slot-scope="text, record">
        <a-input v-model="record.name" />
      </template>
      <template slot="value" slot-scope="text, record">
        <a-select v-model="record.value" style="width: 100%">
          <a-select-option value="String">String</a-select-option>
          <a-select-option value="Blob">File</a-select-option>
        </a-select>
      </template>
      <template slot="example" slot-scope="text, record">
        <MultiLine
          v-model="record.example"
          :disabled="record.value === 'Blob'"
        />
      </template>
      <template slot="desc" slot-scope="text, record">
        <MultiLine v-model="record.desc" />
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
    <a-table
      v-if="value.type === 'urlencoded'"
      :columns="urlColumns"
      :dataSource="dataSource"
      :pagination="false"
      size="small"
    >
      <template slot="name" slot-scope="text, record">
        <a-input v-model="record.name" />
      </template>
      <template slot="example" slot-scope="text, record">
        <MultiLine v-model="record.example" />
      </template>
      <template slot="desc" slot-scope="text, record">
        <MultiLine v-model="record.desc" />
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <a-icon
          v-if="index !== dataSource.length - 1"
          type="delete"
          @click="onClick(index)"
        />
      </template>
    </a-table>
  </div>
</template>

<script>
import Types from "vue-types";
import pick from "lodash-es/pick";

export default {
  props: {
    value: Types.object.def({
      type: "none",
      value: []
    })
  },
  data() {
    return {
      formColumns: [
        {
          title: "名称",
          dataIndex: "name",
          width: "20%",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "类型",
          dataIndex: "value",
          width: 100,
          align: "center",
          scopedSlots: { customRender: "value" }
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
      urlColumns: [
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
          title: "操作",
          dataIndex: "operation",
          width: 60,
          align: "center",
          scopedSlots: { customRender: "operation" }
        }
      ],
      dataSource: this.handlerValue(this.value.value)
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
    "value.value": {
      handler(val) {
        this.dataSource = this.handlerValue(val);
      },
      deep: true
    },
    "value.type": function(val, oldVal) {
      !this.cache && (this.cache = {});
      this.cache[oldVal] = this.value.value;
      this.value.value = this.cache[val] || [];
    },
    isModify(val) {
      if (val) {
        this.value.value.push(this.dataSource[this.dataSource.length - 1]);
      }
    }
  },
  methods: {
    handlerValue(val) {
      if (this.value.type === "formdata") {
        return val.concat({
          name: "",
          value: "String",
          example: "",
          desc: "",
          required: true
        });
      } else {
        return val.concat({
          name: "",
          example: "",
          desc: ""
        });
      }
    },
    onClick(index) {
      this.value.value.splice(index, 1);
    },
    handleChange() {}
  }
};
</script>

<style lang="less" scoped>
/deep/ .ant-table-small {
  border: none;
}
</style>
