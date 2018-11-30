<template>
  <a-card :bordered="false" style="width: 260px">
    <div class="title">
      <span>项目名称</span>
      <div>
        <a-tooltip title="新建接口" placement="top" >
          <a-icon type="file-add" />
        </a-tooltip>
        <a-tooltip title="新建模块" placement="top" >
          <a-icon type="folder-add" />
        </a-tooltip>
        <a-tooltip title="刷新列表" placement="top" >
          <a-icon type="reload" />
        </a-tooltip>
        <a-tooltip title="折叠全部" placement="top" >
          <a-icon type="switcher" @click="expandedKeys = []"/>
        </a-tooltip>
      </div>
    </div>
    <a-directory-tree multiple @select="onSelect"
    :selectedKeys="selectedKeys" :expandedKeys="expandedKeys" @expand="onExpand">
      <a-tree-node key="0-0">
        <template slot="title">态势大屏</template>
        <a-tree-node key="0-0-0" isLeaf>
          <template slot="title"><Method type="Get"/> 用户配置</template>
        </a-tree-node>
        <a-tree-node key="0-0-7" isLeaf>
         <template slot="title"><Method type="Post"/> 菜单</template>
        </a-tree-node>
      </a-tree-node>
      <a-tree-node title="资产风险" key="0-1">
        <a-tree-node key="0-1-0" isLeaf>
          <template slot="title"><Method type="Put"/> 菜单1</template>
        </a-tree-node>
        <a-tree-node key="0-1-1" isLeaf>
          <template slot="title"><Method type="Delete"/> 菜单2</template>
        </a-tree-node>
        <a-tree-node key="0-1-2" isLeaf>
          <template slot="title">
            <Method type="Patch"/>
            <a-input size="small">
              <a-icon type="check" slot="suffix"/>
            </a-input>
          </template>
        </a-tree-node>
        <a-tree-node key="0-1-3" isLeaf>
          <template slot="title"><Method type="Copy"/> 菜单4</template>
        </a-tree-node>
        <a-tree-node key="0-1-4" isLeaf>
          <template slot="title"><Method type="Options"/> 菜单5</template>
        </a-tree-node>
      </a-tree-node>
    </a-directory-tree>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      selectedKeys: [],
      expandedKeys: []
    };
  },
  methods: {
    onSelect(selectedKeys) {
      this.selectedKeys = selectedKeys;
    },
    onExpand(checkedKeys) {
      this.expandedKeys = checkedKeys;
    }
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

  .title {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    > span {
      border-left: 2px solid #1890ff;
      text-indent: 8px;
    }
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
    .title .anticon {
      opacity: 1;
    }
  }
}

/* 重设 tree 组件样式 */
.ant-tree {
  li {
    padding: 0;
  }
  /deep/ .ant-tree-switcher {
    color: rgba(0, 0, 0, 0.65) !important;
  }

  /deep/ .ant-tree-switcher {
    height: 32px;
    line-height: 28px;
  }
  /deep/ .ant-tree-node-content-wrapper {
    height: 32px;
    width: calc(100% - 24px);
    padding: 0;

    &.ant-tree-node-selected {
      color: rgba(0, 0, 0, 0.65) !important;
      &::before {
        background: #e6f7ff !important;
      }
    }

    &::before {
      height: 32px !important;
    }

    .ant-tree-iconEle {
      height: 32px;
      line-height: 32px;
    }

    .ant-tree-title {
      display: inline-block;
      width: calc(100% - 24px);
      line-height: 32px;

      .ant-input-affix-wrapper {
        width: 160px;
        .ant-input-suffix {
          right: 8px;
          color: #52c41a;
        }
      }
    }
  }
  /deep/ .ant-tree-child-tree {
    .ant-tree-iconEle {
      display: none;
    }
    .ant-tree-title {
      width: 100%;
    }
  }
}
</style>
