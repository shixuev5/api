<template>
  <span
    class="method"
    :class="type.toLowerCase()"
    :style="{ fontSize: size + 'px' }"
  >
    {{ text }}
  </span>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "Get"
    },
    size: {
      type: Number,
      default: 12
    },
    simple: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    text() {
      const method = this.type.toUpperCase();
      if (this.simple) {
        switch (method) {
          case "DELETE":
            return "DEL";
          case "PATCH":
            return "PATC";
          case "OPTIONS":
            return "OPT";
          default:
            return method;
        }
      } else {
        return method;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.method {
  display: inline-block;
  min-width: 34px;
  margin-right: 4px;
}
.get {
  color: #52c41a;
}
.post {
  color: #faad14;
}
.put {
  color: #1890ff;
}
.delete,
.del {
  color: #f5222d;
}
.patch,
.copy,
.head,
.options {
  color: #bfbfbf;
}
</style>
