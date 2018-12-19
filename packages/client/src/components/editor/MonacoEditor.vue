<template>
  <div
    ref="editor"
    class="monaco-editor"
    :style="{
      height: `${this.height}px`
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
    height: Types.number.def(300)
  },
  watch: {
    // value(val) {
    //   this.editor.setValue(val);
    // },
    option: {
      handler(val) {
        this.editor.updateOptions(val);
      },
      deep: true
    }
  },
  methods: {
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
        scrollbar: {
          horizontal: "hidden"
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
        this.editor[`on${key[0].toUpperCase() + key.slice(1)}`](
          this.$listeners[key]
        );
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
