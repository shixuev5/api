<template>
  <a-tooltip
    :title="text"
    :visible="hovered"
    @visibleChange="handleHoverChange"
  >
    <a-popover
      trigger="click"
      arrowPointAtCenter
      :visible="clicked"
      :overlayStyle="overlayStyle"
      @visibleChange="handleClickChange"
    >
      <a-textarea v-model="text" slot="content" :rows="4" />
      <a-input v-model="text" v-bind="$attrs"> </a-input>
    </a-popover>
  </a-tooltip>
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
      hovered: false,
      clicked: false,
      overlayStyle: {
        width: "300px"
      },
      text: this.value
    };
  },
  watch: {
    value(val) {
      this.text = val;
    },
    text(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    handleHoverChange(visible) {
      if (this.value.trim()) {
        this.hovered = visible;
        this.clicked = false;
      }
    },
    handleClickChange(visible) {
      this.clicked = visible;
      this.hovered = false;
    }
  }
};
</script>
