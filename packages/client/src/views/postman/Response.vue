<template>
  <a-card :loading="loading" :bordered="false" title="响应">
    <Editor value="{a:1, b:2}"></Editor>
  </a-card>
</template>

<script>
import Types from "vue-types";

export default {
  props: {
    value: Types.object.def({
      headers: [],
      body: JSON.stringify({ a: 1 })
    })
  },
  data() {
    return {
      loading: false
    };
  }
};
</script>

<style lang="less" scoped>
.editor {
  height: 400px;
}
</style>
