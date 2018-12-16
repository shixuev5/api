<template>
  <a-card :bordered="false" style="width: 260px">
    <div class="header">
      <span class="title-bar">项目名称</span>
      <div>
        <a-tooltip title="新建接口" placement="top">
          <a-icon type="file-add" @click="createInterface" />
        </a-tooltip>
        <a-tooltip title="新建模块" placement="top">
          <a-icon type="folder-add" @click="showModal = true" />
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
      :treeData="treeData"
      :loadData="onLoadData"
      :expandedKeys="expandedKeys"
      showIcon
      @select="onSelect"
    >
      <template slot="icon" slot-scope="{ selected }">
        <a-icon :type="selected ? 'folder-open' : 'folder'" />
      </template>
      <div slot="title" slot-scope="{ name, method }">
        <Method :type="method"></Method> {{ name }}
      </div>
    </a-tree>
    <ModuleCreate v-model="showModal"></ModuleCreate>
  </a-card>
</template>

<script>
import * as types from "@/store/types";
import ModuleCreate from "./Create";

export default {
  components: {
    ModuleCreate
  },
  data() {
    return {
      showModal: false,
      expandedKeys: []
    };
  },
  computed: {
    treeData() {
      return this.$store.state.module.list.map(item => {
        return {
          key: item._id,
          title: item.name,
          scopedSlots: { icon: "icon" },
          ...item
        };
      });
    }
  },
  methods: {
    reload() {
      this.$store.dispatch(types.MODULE_LIST);
    },
    createInterface() {},
    async onLoadData(treeNode) {
      if (treeNode.dataRef.children) return;
      const response = await this.$store.dispatch(
        types.INTERFACE_LIST,
        treeNode.dataRef._id
      );
      treeNode.dataRef.children = response.map(item => {
        return {
          scopedSlots: { title: "title" },
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
