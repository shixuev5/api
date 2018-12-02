<template>
  <a-list
    :grid="{ gutter: 16, column: 4 }"
    :pagination="pagination"
    :dataSource="value"
  >
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-card :title="item.title">Card content</a-card>
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
        pageSize: 3
      }
    };
  }
};
</script>

<style lang="less" scoped></style>
