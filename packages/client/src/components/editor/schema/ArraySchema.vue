<template>
  <a-form layout="vertical">
    <a-form-item label="maximum">
      <!-- <a-input-number :min="1" :max="10" v-model="value" @change="onChange" /> -->
    </a-form-item>
    <a-form-item label="minimum">
      <!-- <a-input-number :min="1" :max="10" v-model="value" @change="onChange" /> -->
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

<style lang="less" scoped>
.ant-form {
  padding: 16px;
}
</style>
