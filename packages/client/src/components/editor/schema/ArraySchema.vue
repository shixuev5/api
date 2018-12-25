<template>
  <a-form layout="inline">
    <a-form-item label="Field A">
      <a-input placeholder="input placeholder" />
    </a-form-item>
    <a-form-item label="Field B">
      <a-input placeholder="input placeholder" />
    </a-form-item>
  </a-form>
</template>

<script>
import Types from "vue-types";

export default {
  props: {
    value: Types.object.isRequired
  },
  data() {
    return {
      // form: this.$form.
    };
  }
};
</script>

<style lang="less" scoped></style>
