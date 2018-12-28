<template>
  <a-modal
    :visible="value"
    title="新建模块"
    :footer="null"
    :maskClosable="false"
    @cancel="$emit('input', false)"
  >
    <a-form layout="vertical" @submit.prevent="handleSubmit" :form="form">
      <a-form-item label="模块名">
        <a-input
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '请输入模块名!' }] }
          ]"
        ></a-input>
      </a-form-item>
      <a-form-item label="基础路径">
        <a-input
          v-decorator="[
            'path',
            {
              rules: [
                { required: true, message: '请输入模块基础路径!' },
                { message: '请输入有效的URL!' }
              ]
            }
          ]"
          placeholder="/"
        ></a-input>
      </a-form-item>
      <a-form-item style="marginBottom: 0">
        <a-button
          type="primary"
          htmlType="submit"
          :disabled="hasErrors(form.getFieldsError())"
          block
          >完成</a-button
        >
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import Types from "vue-types";
import * as types from "@/store/types";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default {
  props: {
    value: Types.bool.def(false)
  },
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this),
      groups: []
    };
  },
  methods: {
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    handleSubmit() {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          await this.$store.dispatch(types.MODULE_CREATE, values);
          this.form.resetFields();
          this.$emit("input", false);
          this.$message.success("新建模块成功！");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.ant-form-vertical .ant-form-item {
  margin-bottom: 16px;
}
</style>
