<template>
  <a-list
    :grid="{ gutter: 16, column: 4 }"
    :pagination="{ pageSize: 8 }"
    :dataSource="value"
  >
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-card hoverable>
        <template class="ant-card-actions" slot="actions">
          <a-icon type="setting" />
          <a-icon type="edit" />
          <a-icon type="ellipsis" />
        </template>
        <a-card-meta :title="item.name" :description="item.desc">
          <a-avatar slot="avatar" :size="40">{{ item.name[0] }}</a-avatar>
        </a-card-meta>
      </a-card>
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
    return {};
  }
};
</script>

<style lang="less" scoped>
.ant-list {
  margin-top: 16px;
}
</style>
