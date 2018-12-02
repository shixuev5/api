<template>
  <a-form
    layout="vertical"
    @submit.prevent="handleSubmit"
    :autoFormCreate="
      form => {
        this.form = form;
      }
    "
  >
    <template v-if="form">
      <a-form-item
        label="项目名"
        fieldDecoratorId="name"
        :fieldDecoratorOptions="{
          rules: [{ required: true, message: '请输入项目名!' }]
        }"
      >
        <a-input></a-input>
      </a-form-item>
      <a-form-item
        label="基础路径"
        fieldDecoratorId="path"
        :fieldDecoratorOptions="{
          rules: [{ message: '请输入有效的URL!' }]
        }"
      >
        <a-input placeholder="/"></a-input>
      </a-form-item>
      <a-form-item label="项目描述" fieldDecoratorId="desc">
        <a-textarea
          placeholder="请简单描述项目信息... (可选)"
          :autosize="{ minRows: 4, maxRows: 6 }"
        ></a-textarea>
      </a-form-item>
      <a-form-item label="项目权限" fieldDecoratorId="permission">
        <a-radio-group name="radioGroup" defaultValue="private">
          <a-radio name="permission" value="private">
            <a-icon type="lock" />私有
            <p>项目访问权限必须明确授权给每个用户。</p>
          </a-radio>
          <a-radio name="permission" value="shared">
            <a-icon type="share-alt" />内部
            <p>该项目允许已登录的用户访问。</p>
          </a-radio>
          <a-radio name="permission" value="public">
            <a-icon type="unlock" />公开
            <p>该项目允许任何人访问。</p>
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          htmlType="submit"
          :disabled="hasErrors(form.getFieldsError())"
          block
          >完成</a-button
        >
      </a-form-item>
    </template>
  </a-form>
</template>

<script>
import * as types from "@/store/types";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default {
  data() {
    return {
      hasErrors,
      form: null
    };
  },
  methods: {
    handleSubmit() {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const { _id } = await this.$store.dispatch(
            types.PROJECT_CREATE,
            values
          );
          this.$router.push({ name: "project", params: { id: _id } });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.ant-radio-wrapper {
  display: block;
  p {
    text-indent: 42px;
    margin-bottom: 0;
  }
}
</style>
