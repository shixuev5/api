<template>
  <a-card :loading="true" :bordered="false" title="响应"
    >whatever content</a-card
  >
</template>

<script>
import Types from "vue-types";

export default {
  props: {
    value: Types.object.def({
      header: [],
      body: {}
    })
  }
};
</script>

<style lang="less" scoped></style>
