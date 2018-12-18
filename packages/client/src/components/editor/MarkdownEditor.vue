<template>
  <mavon-editor
    class="markdown-editor"
    v-model="markdown"
    placeholder=""
    fontSize="14px"
    :boxShadow="false"
    :subfield="false"
    :toolbars="toolbars"
    v-bind="$attrs"
    v-on="$listeners"
  >
  </mavon-editor>
</template>

<script>
import Types from "vue-types";

export default {
  inheritAttrs: false,
  props: {
    value: Types.string.def("")
  },
  data() {
    return {
      markdown: this.value,
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    };
  },
  watch: {
    markdown(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style lang="less" scoped>
.markdown-editor {
  z-index: 100 !important;
}
</style>
