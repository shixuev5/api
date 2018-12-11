<template>
  <a-form @submit.prevent="handleSubmit" :form="form">
    <a-form-item>
      <a-input
        v-decorator="[
          'name',
          {
            rules: [{ required: true, message: '请输入您的用户名或邮箱!' }]
          }
        ]"
        placeholder="用户名 | 邮箱"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          {
            rules: [
              { required: true, message: '请输入您的密码!' },
              { min: 6, message: '密码不少于6个字符!' }
            ]
          }
        ]"
        type="password"
        placeholder="密码"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-checkbox
        v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true
          }
        ]"
        >记住我</a-checkbox
      >
      <router-link to="" style="float: right"> 忘记密码 </router-link>
      <a-button
        :disabled="hasErrors(form.getFieldsError())"
        type="primary"
        htmlType="submit"
        block
      >
        登陆
      </a-button>
      或 <router-link to="/signup">现在注册</router-link>
    </a-form-item>
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
      form: this.$form.createForm(this)
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          await this.$store.dispatch(types.USER_LOGIN, values);
          this.$router.replace("/", () => {
            if (!this.$user.info.guide) this.$message.success("欢迎回来～");
          });
        }
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.form.validateFields();
    });
  }
};
</script>
