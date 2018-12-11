<template>
  <a-form :form="form">
    <a-form-item label="Form Layout"> </a-form-item>
    <a-form-item label="Field A">
      <a-input placeholder="input placeholder" />
    </a-form-item>
    <a-form-item label="Field B">
      <a-input placeholder="input placeholder" />
    </a-form-item>
    <a-form-item> </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this)
    };
  }
};
</script>

<style lang="less" scoped></style>
