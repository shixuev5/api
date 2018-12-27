<template>
  <a-tabs tabPosition="left" size="small" :style="{ height: '400px' }">
    <a-tab-pane v-for="item in config" :tab="item.desc" :key="item.type"
      >Content of tab 1</a-tab-pane
    >
  </a-tabs>
</template>

<script>
import Types from "vue-types";

export default {
  props: {
    value: Types.object.isRequired
  },
  data() {
    return {
      config: [
        { type: "custom", desc: "自定义", children: [] },
        { type: "address", desc: "地址", children: [] },
        { type: "commerce", desc: "贸易", children: [] },
        { type: "company", desc: "公司", children: [] },
        { type: "database", desc: "数据库", children: [] },
        { type: "date", desc: "日期", children: [] },
        { type: "finance", desc: "财政", children: [] },
        { type: "hacker", desc: "地址", children: [] },
        { type: "image", desc: "图片", children: [] },
        { type: "internet", desc: "互联网", children: [] },
        { type: "lorem", desc: "地址", children: [] },
        { type: "name", desc: "名称", children: [] },
        { type: "phone", desc: "电话", children: [] },
        { type: "random", desc: "随机值", children: [] },
        { type: "system", desc: "系统", children: [] }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
/deep/ .ant-tabs {
  &-tab {
    text-align: center !important;
  }
}
</style>
