<template>
  <span class="method" :class="type.toLowerCase()">
    {{ text.toUpperCase() }}
  </span>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "Get"
    },
    simple: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    text() {
      if (this.simple) {
        switch (this.type) {
          case "Delete":
            return "Del";
          case "Patch":
            return "Patc";
          case "Options":
            return "Opt";
          default:
            return this.type;
        }
      } else {
        return this.type;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.method {
  display: inline-block;
  width: 34px;
  font-size: 12px;
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
