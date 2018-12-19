<template>
  <a-tooltip :visible="hovered" @visibleChange="handleHoverChange">
    <span slot="title">{{ text }}</span>
    <a-popover
      trigger="click"
      arrowPointAtCenter
      :visible="clicked"
      :overlayStyle="overlayStyle"
      @visibleChange="handleClickChange"
    >
      <a-textarea v-model="text" slot="content" :autosize="{ minRows: 4 }" />
      <a-input v-model="text" :disabled="disabled"> </a-input>
    </a-popover>
  </a-tooltip>
</template>

<script>
import Types from "vue-types";

export default {
  props: {
    value: Types.string.def(""),
    disabled: Types.bool.def(false)
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
      this.hovered = false;
      this.clicked = visible;
    }
  }
};
</script>
