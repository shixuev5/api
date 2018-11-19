<template>
  <svg class="icon" aria-hidden="true" :style="style">
    <use v-bind="{ 'xlink:href': `#icon-${type}` }"></use>
  </svg>
</template>

<script>
import Types from "vue-types";

export default {
  props: {
    type: Types.string.isRequired,
    size: Types.number.def(16),
    color: Types.string.def("currentColor")
  },
  computed: {
    style() {
      return {
        fill: this.color,
        fontSize: this.size
      };
    }
  }
};
</script>

<style lang="less" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
}
</style>
