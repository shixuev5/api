<template>
  <a-modal
    :visible="value"
    title="从模版新建"
    :maskClosable="false"
    :bodyStyle="{ padding: 0 }"
    @cancel="$emit('input', false)"
  >
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :pagination="false"
      :rowSelection="rowSelection"
      :customRow="customRow"
      rowKey="_id"
      size="small"
    />
    <a-button
      slot="footer"
      type="primary"
      :disabled="!rowSelection.selectedRowKeys.length"
      @click="onClick"
      block
    >
      确认
    </a-button>
  </a-modal>
</template>

<script>
import Types from "vue-types";
import * as types from "@/store/types";
import { createInterface } from "@/utils/postman";

export default {
  props: {
    value: Types.bool.def(false)
  },
  data() {
    return {
      columns: [
        {
          title: "名称",
          dataIndex: "name"
        },
        {
          title: "描述",
          dataIndex: "desc"
        }
      ],
      rowSelection: {
        type: "radio",
        selectedRowKeys: [],
        onChange: this.onSelectChange
      },
      dataSource: [
        {
          _id: "default",
          name: "空模版",
          desc: "这是默认空模版"
        },
        {
          _id: "test1",
          name: "测试模版1",
          desc: "这是测试模版1"
        },
        {
          _id: "test2",
          name: "测试模版2",
          desc: "这是测试模版2"
        }
      ]
    };
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      this.rowSelection.selectedRowKeys = selectedRowKeys;
    },
    customRow(record) {
      return {
        on: {
          click: () => {
            this.rowSelection.selectedRowKeys = [record._id];
          }
        }
      };
    },
    onClick() {
      const interfaceTabs = this.$store.state.interface.tabs;
      const api = createInterface({
        name: "未命名接口",
        desc: "",
        request: {
          query: [
            {
              name: "",
              example: "",
              desc: "",
              required: true
            }
          ],
          headers: [
            {
              name: "",
              value: "",
              desc: ""
            }
          ],
          body: {
            type: "none"
          }
        },
        status: "define",
        project_id: this.$store.state.project.info._id
      });
      this.$store.commit(types.SET_INTERFACE_TABS, [...interfaceTabs, api]);
      this.$store.commit(types.SET_INTERFACE_ACTIVE_KEY, api._id);
      this.$emit("input", false);
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .ant-table {
  &-small {
    border: none;
  }
  &-row {
    cursor: pointer;
  }
}
</style>
