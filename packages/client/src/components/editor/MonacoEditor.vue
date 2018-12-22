<template>
  <div
    ref="editor"
    class="monaco-editor"
    :style="{
      width: processSize(width),
      height: processSize(height)
    }"
  ></div>
</template>

<script>
import * as monaco from "monaco-editor";
import Types from "vue-types";

export default {
  inheritAttrs: false,
  // refs: https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html
  props: {
    language: Types.oneOf([
      "javascript",
      "json",
      "markdown",
      "typescript",
      "yaml"
    ]).def("json"),
    value: Types.string.def(""),
    focus: Types.bool.def(false),
    option: Types.object.def({}),
    readOnly: Types.bool.def(false),
    theme: Types.string.def("vs"),
    width: Types.oneOfType([String, Number]).def("100%"),
    height: Types.oneOfType([String, Number]).def(300)
  },
  watch: {
    value(val) {
      this.editor.setValue(val);
    },
    width() {
      this.$nextTick(() => this.editor.layout());
    },
    height() {
      this.$nextTick(() => this.editor.layout());
    },
    option: {
      handler(val) {
        this.editor.updateOptions(val);
      },
      deep: true
    }
  },
  methods: {
    processSize(size) {
      return !/^\d+$/.test(size) ? size : `${size}px`;
    },
    setJsonDefault() {
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        allowComments: true,
        validate: true
      });
    }
  },
  mounted() {
    this.setJsonDefault();
    const option = Object.assign(
      {
        value: this.value,
        language: this.language,
        autoIndent: true,
        formatOnPaste: true,
        formatOnType: true,
        contextmenu: false,
        minimap: {
          enabled: false
        },
        lineNumbersMinChars: 4,
        tabSize: 2,
        fontSize: 14,
        readOnly: this.readOnly,
        theme: this.theme
      },
      this.option
    );
    this.editor = monaco.editor.create(this.$refs.editor, option);
    if (this.focus) this.editor.focus();
    for (const key in this.$listeners) {
      if (this.$listeners.hasOwnProperty(key)) {
        const eventName = `on${key[0].toUpperCase() + key.slice(1)}`;
        this.editor[eventName] && this.editor[eventName](this.$listeners[key]);
      }
    }
  },
  beforeDestroy() {
    this.editor.dispose();
  }
};
</script>

<style lang="less" scoped>
.monaco-editor {
  width: 100%;
  border: 1px solid #e8e8e8;
}
</style>
