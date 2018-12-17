<template>
  <div class="placeholder center" :style="style">
    <div>
      <Icon type="placeholder" :size="size"></Icon>
      <div>
        <p>{{ placeholder }}</p>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Types from "vue-types";

export default {
  props: {
    size: Types.number.def(40),
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
      p {
        font-weight: bold;
        margin-bottom: 8px;
      }
    }
  }
}
</style>
