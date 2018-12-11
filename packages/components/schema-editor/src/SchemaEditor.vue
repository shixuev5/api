<template>
  <div id="editor">
    <JsonTree></JsonTree>
    <Schema type="array"></Schema>
  </div>
</template>

<script>
import JsonTree from "./component/JsonTree.vue";
import Schema from "./component/Schema.vue";
import Preview from "./component/Preview.vue";

export default {
  components: {
    JsonTree,
    Schema,
    Preview
  }
};
</script>

<style lang="less" scoped>
#editor {
  display: flex;
  width: 100%;
  height: 400px;
}
</style>
