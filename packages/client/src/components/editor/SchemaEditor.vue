<template>
  <div>
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :expandedRowKeys="expandedRowKeys"
      :pagination="false"
      :scroll="{ y: height }"
      :customRow="
        record => ({
          on: {
            dblclick: showModal(record)
          }
        })
      "
      @expand="onExpand"
      rowKey="id"
      size="small"
    >
      <template slot="name" slot-scope="text, record">
        <span class="icon">{{ formatType(record.type) }}</span>
        <span>{{ text }}</span>
      </template>
      <template slot="desc" slot-scope="text, record">
        <MultiLine v-if="!isRoot(record)" v-model="record.description" />
      </template>
      <template slot="mock" slot-scope="text, record">
        <a-input
          :value="record.mock"
          v-if="!isRoot(record)"
          @click="onClick(record)"
        />
      </template>
      <template slot="required" slot-scope="text, record">
        <a-switch
          v-if="!isForbidden(record)"
          :checked="isRequired(record)"
          @change="checked => onChange(checked, record)"
        />
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-icon
          v-if="!isForbidden(record)"
          type="edit"
          @click="showModal(record)()"
      /></template>
    </a-table>
    <a-modal
      v-model="visible"
      :width="800"
      :title="componentType === 'MockSchema' ? 'Mock' : 'Schema'"
      :bodyStyle="{ padding: 0 }"
      :footer="null"
    >
      <keep-alive>
        <component :is="componentType" :value="selectedSchema"></component>
      </keep-alive>
    </a-modal>
  </div>
</template>

<script>
import Types from "vue-types";
import capitalize from "lodash-es/capitalize";
import ArraySchema from "./schema/ArraySchema";
import BooleanSchema from "./schema/BooleanSchema";
import IntegerSchema from "./schema/IntegerSchema";
import NullSchema from "./schema/NullSchema";
import NumberSchema from "./schema/NumberSchema";
import ObjectSchema from "./schema/ObjectSchema";
import StringSchema from "./schema/StringSchema";
import MockSchema from "./schema/MockSchema";
import { formatType, schema2array, array2tree } from "./schema-util.js";

export default {
  components: {
    ArraySchema,
    BooleanSchema,
    IntegerSchema,
    NullSchema,
    NumberSchema,
    ObjectSchema,
    StringSchema,
    MockSchema
  },
  props: {
    value: Types.object.isRequired,
    height: Types.number.def(600)
  },
  data() {
    return {
      formatType,
      columns: [
        {
          title: "名称",
          dataIndex: "title",
          width: "50%",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "描述",
          dataIndex: "description",
          align: "center",
          scopedSlots: { customRender: "desc" }
        },
        {
          title: "Mock",
          dataIndex: "mock",
          align: "center",
          width: 120,
          scopedSlots: { customRender: "mock" }
        },
        {
          title: "必须",
          dataIndex: "required",
          align: "center",
          width: 100,
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
      dataSource: [],
      schemaList: [],
      expandedRowKeys: [],
      visible: false,
      componentType: "",
      selectedSchema: {}
    };
  },
  watch: {
    value: {
      handler(val) {
        this.schemaList = schema2array(val);
        this.dataSource = array2tree(this.schemaList);
        this.schemaList.forEach(item => {
          if (item.children) {
            this.expandedRowKeys.push(item.id);
          }
        });
      },
      immediate: true
    }
  },
  methods: {
    isForbidden(record) {
      return this.isRoot(record) || this.isArrayItems(record);
    },
    isRoot(record) {
      return Boolean(record.$schema);
    },
    isArrayItems(record) {
      if (record.parentId === 0) return true;
      const { type } = this.schemaList.find(
        item => item.id === record.parentId
      );
      return record.title === "items" && type === "array";
    },
    isRequired(record) {
      const parent = this.schemaList.find(item => item.id === record.parentId);
      return parent
        ? parent.required && parent.required.includes(record.title)
        : true;
    },
    onChange(checked, record) {
      const parent = this.schemaList.find(item => item.id === record.parentId);
      if (parent.required) {
        checked
          ? parent.required.push(record.title)
          : parent.required.splice(parent.required.indexOf(record.title), 1);
      }
    },
    onExpand(expanded, record) {
      if (expanded) {
        this.expandedRowKeys.push(record.id);
      } else {
        this.expandedRowKeys.splice(this.expandedRowKeys.indexOf(record.id), 1);
      }
    },
    showModal(record) {
      return () => {
        if (!this.isForbidden(record)) {
          this.visible = true;
          this.selectedSchema = record;
          this.componentType = `${capitalize(record.type)}Schema`;
        }
      };
    },
    onClick(record) {
      this.visible = true;
      this.selectedSchema = record;
      this.componentType = "MockSchema";
    }
  }
};
</script>

<style lang="less" scoped>
.ant-table-wrapper {
  min-height: 300px;
}
/deep/ .ant-table {
  &-row {
    cursor: pointer;
    .anticon-edit {
      padding: 8px;
    }
  }
  &-row:nth-child(odd) {
    background: #f5f5f5;
  }
  &-row-expand-icon {
    margin-right: 0 !important;
  }
  .icon {
    margin: 0 8px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    display: inline-block;
    color: #1890ff;
  }
}
</style>
