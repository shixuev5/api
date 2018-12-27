<template>
  <div class="container">
    <section>
      <h3 class="title-bar">代码</h3>
      <MonacoEditor :value="code"></MonacoEditor>
    </section>
  </div>
</template>

<script>
import Types from "vue-types";
import omit from "lodash-es/omit";

export default {
  props: {
    value: Types.object.isRequired
  },
  computed: {
    code() {
      return JSON.stringify(omit(this.value, ["id", "parentId"]), null, 2);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 16px;
}
</style>
