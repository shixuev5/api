<template>
  <a-list
    :grid="{ gutter: 16, column: 4 }"
    :pagination="pagination"
    :dataSource="value"
  >
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-card hoverable>
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          slot="cover"
        />
        <template class="ant-card-actions" slot="actions">
          <a-icon type="setting" />
          <a-icon type="edit" />
          <a-icon type="ellipsis" />
        </template>
        <a-card-meta title="Card title" description="This is the description">
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-card-meta>
      </a-card>
    </a-list-item>
  </a-list>
</template>

<script>
import Types from "vue-types";

export default {
  props: {
    value: Types.array.def([
      {
        title: "Ant Design Title 1"
      },
      {
        title: "Ant Design Title 2"
      },
      {
        title: "Ant Design Title 3"
      },
      {
        title: "Ant Design Title 4"
      },
      {
        title: "Ant Design Title 5"
      },
      {
        title: "Ant Design Title 6"
      },
      {
        title: "Ant Design Title 7"
      },
      {
        title: "Ant Design Title 8"
      }
    ])
  },
  data() {
    return {
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 8
      }
    };
  }
};
</script>

<style lang="less" scoped></style>
