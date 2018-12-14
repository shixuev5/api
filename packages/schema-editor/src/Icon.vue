<template>
  <span class="type-icon">{{ icon }}</span>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "*"
    }
  },
  computed: {
    icon() {
      switch (this.type) {
        case "array":
          return "[ ]";
        case "object":
          return "{ }";
        case "string":
          return "str";
        case "number":
          return "num";
        case "integer":
          return "int";
        case "boolean":
          return "bol";
        case "null":
          return "nul";
        default:
          return "*";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.type-icon {
  margin: 0 8px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  text-align: center;
  color: #1890ff;
}
</style>
