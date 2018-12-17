<template>
  <a-card :bordered="false" style="width: 260px">
    <div class="header">
      <span class="title-bar">{{ info.name }}</span>
      <div>
        <a-tooltip title="新建接口" placement="top">
          <a-icon type="file-add" @click="interfaceModal = true" />
        </a-tooltip>
        <a-tooltip title="新建模块" placement="top">
          <a-icon type="folder-add" @click="moduleModal = true" />
        </a-tooltip>
        <a-tooltip title="刷新列表" placement="top">
          <a-icon type="reload" @click="reload" />
        </a-tooltip>
        <a-tooltip title="折叠全部" placement="top">
          <a-icon type="switcher" @click="expandedKeys = []" />
        </a-tooltip>
      </div>
    </div>
    <a-tree
      v-if="treeData.length"
      :treeData="treeData"
      :loadData="onLoadData"
      :expandedKeys="expandedKeys"
      showIcon
      @select="onSelect"
    >
      <template slot="icon" slot-scope="{ expanded }">
        <a-icon :type="expanded ? 'folder-open' : 'folder'" />
      </template>
      <div slot="module" slot-scope="{ name, path }">
        {{ name }} <span class="right dodge">{{ path }}</span>
      </div>
      <div slot="interface" slot-scope="{ name, method }">
        <Method :type="method"></Method> {{ name }}
      </div>
    </a-tree>
    <Placeholder v-else></Placeholder>
    <InterfaceCreate v-model="interfaceModal"></InterfaceCreate>
    <ModuleCreate v-model="moduleModal"></ModuleCreate>
  </a-card>
</template>

<script>
import * as types from "@/store/types";
import InterfaceCreate from "../interface/Create";
import ModuleCreate from "./Create";

export default {
  components: {
    InterfaceCreate,
    ModuleCreate
  },
  data() {
    return {
      interfaceModal: false,
      moduleModal: false,
      expandedKeys: []
    };
  },
  computed: {
    info() {
      return this.$store.state.project.info;
    },
    treeData() {
      return this.$store.state.module.list.map(item => {
        return {
          key: item._id,
          scopedSlots: { icon: "icon", title: "module" },
          ...item
        };
      });
    }
  },
  methods: {
    reload() {
      this.$store.dispatch(types.MODULE_LIST);
    },
    async onLoadData(treeNode) {
      if (treeNode.dataRef.children) return;
      const response = await this.$store.dispatch(
        types.INTERFACE_LIST,
        treeNode.dataRef._id
      );
      treeNode.dataRef.children = response.map(item => {
        return {
          scopedSlots: { title: "interface" },
          ...item
        };
      });
    },
    onSelect(selectedKeys) {
      this.expandedKeys = selectedKeys;
    }
  },
  created() {
    this.reload();
  }
};
</script>

<style lang="less" scoped>
.ant-card {
  height: calc(100vh - 48px);
  border-right: 1px solid #e8e8e8;

  /deep/ &-body {
    height: 100%;
    overflow-y: auto;
    padding: 0;
  }

  .header {
    display: flex;
    justify-content: space-between;
    padding: 8px;

    .anticon {
      margin: 0 4px;
      opacity: 0;
      cursor: pointer;
      &:hover {
        color: #1890ff;
      }
    }
  }

  &:hover {
    .header .anticon {
      opacity: 1;
    }
  }
}

/* 重设 tree 组件样式 */
/deep/ .ant-tree {
  &-node-content-wrapper {
    width: calc(100% - 24px);
    padding-left: 0 !important;

    .ant-tree-title {
      display: inline-block;
      width: calc(100% - 24px);
    }
  }
  &-child-tree {
    .ant-tree-iconEle {
      display: none;
    }
    .ant-tree-title {
      width: 100%;
    }
  }
}
</style>
