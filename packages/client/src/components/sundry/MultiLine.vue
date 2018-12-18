<template>
  <a-tooltip :visible="hovered" @visibleChange="handleHoverChange">
    <span slot="title">{{ text }}</span>
    <a-popover
      title=""
      trigger="click"
      :visible="clicked"
      @visibleChange="handleClickChange"
    >
      <a-textarea
        v-model="text"
        slot="content"
        :autosize="{ minRows: 3, maxRows: 6 }"
      />
      <a-input v-model="text"> </a-input>
    </a-popover>
  </a-tooltip>
</template>

<script>
import Types from "vue-types";

export default {
  props: {
    value: Types.string.def("")
  },
  data() {
    return {
      text: this.value
    };
  },
  watch: {
    text(val) {
      this.$emit("input", val);
    }
  }
};
</script>
