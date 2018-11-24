<template>
  <a-card :bordered="false" style="width: 260px">
    <a-directory-tree :draggable="true" :selectedKeys="[]" @select="onSelect" @expand="onExpand">
      <a-tree-node key="0-0">
        <template slot="title">态势大屏<a-icon type="ellipsis" @click.stop/></template>
        <a-tree-node key="0-0-0" isLeaf>
          <template slot="title"><Color type="Get"/> 用户配置</template>
        </a-tree-node>
        <a-tree-node key="0-0-7" isLeaf>
         <template slot="title"><Color type="Post"/> 菜单</template>
        </a-tree-node>
      </a-tree-node>
      <a-tree-node title="资产风险" key="0-1">
        <a-tree-node key="0-1-0" isLeaf>
          <template slot="title"><Color type="Put"/> 菜单1</template>
        </a-tree-node>
        <a-tree-node key="0-1-1" isLeaf>
          <template slot="title"><Color type="Delete"/> 菜单2</template>
        </a-tree-node>
        <a-tree-node key="0-1-2" isLeaf>
          <template slot="title"><Color type="Patch"/> 菜单3</template>
        </a-tree-node>
        <a-tree-node key="0-1-3" isLeaf>
          <template slot="title"><Color type="Copy"/> 菜单4</template>
        </a-tree-node>
        <a-tree-node key="0-1-4" isLeaf>
          <template slot="title"><Color type="Options"/> 菜单5</template>
        </a-tree-node>
      </a-tree-node>
    </a-directory-tree>
    <a-button icon="plus" block>新建模块</a-button>
  </a-card>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onSelect(selectedKeys, info) {
      // this.expandedKeys = selectedKeys;
    },
    onExpand(checkedKeys, info) {
      // this.expandedKeys = checkedKeys;
    }
  }
};
</script>

<style lang="less" scoped>
.ant-card {
  height: calc(100vh - 48px);
  border-right: 1px solid #e8e8e8;

  /deep/ &-body {
    height: calc(100% - 48px);
    overflow-y: auto;
    padding: 0;
  }

  .ant-btn {
    position: absolute;
    bottom: 0;
    overflow: hidden;
    height: 48px;
    border: none;
  }
}

/* 重设 tree 组件样式 */
.ant-tree {
  /deep/ .ant-tree-switcher {
    height: 32px;
    line-height: 32px;
  }
  /deep/ .ant-tree-node-content-wrapper {
    height: 32px;
    width: calc(100% - 24px);
    padding: 0;

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

      &:hover {
        .anticon {
          display: inline-block;
        }
      }

      .anticon {
        display: none;
        line-height: 32px;
        width: 32px;
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
