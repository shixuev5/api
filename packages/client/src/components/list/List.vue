<template>
  <a-list itemLayout="horizontal" :pagination="pagination" :dataSource="value">
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-list-item-meta :description="item.desc">
        <span slot="title">
          <router-link :to="{ name: 'group', params: { id: item._id } }">{{
            item.name
          }}</router-link>
          <a-tag color="blue">拥有者</a-tag>
        </span>
        <a-avatar slot="avatar" :size="40">{{ item.name[0] }}</a-avatar>
      </a-list-item-meta>
      <a-tooltip
        v-if="item.permission === 'private'"
        title="私有 - 群组访问权限必须明确授权给每个用户。"
        placement="left"
      >
        <a-icon type="lock" />
      </a-tooltip>
      <a-tooltip
        v-else-if="item.permission === 'shared'"
        title="内部 - 该群组允许已登录的用户访问。"
        placement="left"
      >
        <a-icon type="share-alt" />
      </a-tooltip>
      <a-tooltip v-else title="公开 - 该群组允许任何人访问。" placement="left">
        <a-icon type="unlock" />
      </a-tooltip>
    </a-list-item>
  </a-list>
</template>

<script>
import Types from "vue-types";

export default {
  props: {
    value: Types.array.def([])
  },
  data() {
    return {
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 3
      }
    };
  }
};
</script>

<style lang="less" scoped>
.ant-list-item {
  padding: 8px 0;
  &-meta {
    align-items: center;
    &-title {
      a {
        color: rgba(0, 0, 0, 0.65);
      }
      .ant-tag {
        margin: 0 8px;
      }
    }
  }
  .anticon {
    font-size: 16px;
  }
}
</style>
