<template>
  <a-list itemLayout="horizontal" :pagination="pagination" :dataSource="value">
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-list-item-meta
        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
      >
        <a slot="title" href="https://vuecomponent.github.io/ant-design-vue/">{{
          item.title
        }}</a>
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      </a-list-item-meta>
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
      }
    ])
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

<style lang="less" scoped></style>
