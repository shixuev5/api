<template>
  <div class="placeholder center" :style="style">
    <div>
      <Icon type="placeholder" :size="size"></Icon>
      <div>
        <h3>{{ placeholder }}</h3>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Types from "vue-types";

export default {
  props: {
    size: Types.number.def(80),
    height: Types.oneOfType([String, Number]).def(200),
    placeholder: Types.string.def("暂无数据")
  },
  computed: {
    style() {
      return {
        height: `${parseFloat(this.height)}px`
      };
    }
  }
};
</script>

<style lang="less" scoped>
.placeholder {
  > div {
    display: flex;
    align-items: center;
    > div {
      margin-left: 24px;
    }
  }
}
</style>
