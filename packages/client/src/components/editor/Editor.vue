<template>
  <div class="editor" ref="editor"></div>
</template>

<script>
import * as monaco from "monaco-editor";
import Types from "vue-types";

export default {
  inheritAttrs: false,
  props: {
    language: Types.oneOf([
      "javascript",
      "json",
      "markdown",
      "typescript",
      "yaml"
    ]).def("javascript"),
    value: Types.string.def(""),
    focus: Types.bool.def(false),
    option: Types.object.def({})
  },
  watch: {
    value(val) {
      this.editor.setValue(val);
    },
    option: {
      handler(val) {
        this.editor.updateOptions(val);
      },
      deep: true
    }
  },
  mounted() {
    const option = Object.assign(
      {
        value: this.value,
        language: this.language,
        minimap: {
          enable: false
        },
        lineNumbers: "off"
      },
      this.option
    );
    this.editor = monaco.editor.create(this.$refs.editor, option);
    if (this.focus) this.editor.focus();
    for (const key in this.$listeners) {
      if (this.$listeners.hasOwnProperty(key)) {
        this.editor[`on${key[0].toUpperCase + key.slice(1)}`] = this.$listeners[
          key
        ];
      }
    }
  },
  beforeDestroy() {
    this.editor.dispose();
  }
};
</script>

<style lang="less" scoped>
.editor {
  width: 100%;
  height: 100%;
}
</style>
