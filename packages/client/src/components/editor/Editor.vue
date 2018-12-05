<template>
  <div class="editor" ref="editor"></div>
</template>

<script>
import * as monaco from "monaco-editor";
import Types from "vue-types";

export default {
  props: {
    language: Types.oneOf([
      "javascript",
      "json",
      "markdown",
      "typescript",
      "yaml"
    ]).def("javascript"),
    value: Types.string.def("")
  },
  mounted() {
    this.$editor = monaco.editor.create(this.$refs.editor, {
      value: this.value,
      language: this.language
    });
  }
};
</script>

<style lang="less" scoped>
.editor {
  width: 100%;
  height: 100%;
}
</style>
