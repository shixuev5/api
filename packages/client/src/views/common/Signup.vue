<template>
  <a-form @submit.prevent="signup" :form="form">
    <a-form-item hasFeedback>
      <a-input
        v-decorator="[
          'name',
          {
            validateFirst: true,
            rules: [
              {
                required: true,
                whitespace: true,
                message: '请输入您的用户名!'
              },
              {
                validator: exsitCheck,
                message: '用户名已注册!'
              }
            ]
          }
        ]"
        placeholder="用户名"
      >
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item hasFeedback>
      <a-input
        v-decorator="[
          'email',
          {
            validateFirst: true,
            rules: [
              { required: true, message: '请输入您的邮箱!' },
              { type: 'email', message: '请输入有效的邮箱地址!' },
              { validator: exsitCheck, message: '邮箱已注册!' }
            ]
          }
        ]"
        type="email"
        placeholder="邮箱"
      >
        <a-icon slot="prefix" type="mail" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item help="密码不少于6个字符">
      <a-input
        v-decorator="[
          'password',
          {
            rules: [
              { required: true, message: '请输入您的密码!' },
              {
                validator: this.validateToNextPassword
              },
              { min: 6, message: '密码不少于6个字符!' }
            ]
          }
        ]"
        type="password"
        placeholder="密码"
      >
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'confirm',
          {
            rules: [
              { required: true, message: '请再次输入您的密码!' },
              {
                validator: this.compareToFirstPassword
              }
            ]
          }
        ]"
        type="password"
        placeholder="确认密码"
        @blur="handleConfirmBlur"
      >
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        htmlType="submit"
        :disabled="hasErrors(form.getFieldsError())"
        block
        >注册</a-button
      >
      <router-link to="/login">已有账号？现在登陆</router-link>
    </a-form-item>
  </a-form>
</template>

<script>
import debounce from "lodash-es/debounce";
import * as types from "@/store/types";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default {
  data() {
    return {
      hasErrors,
      confirmDirty: false,
      form: this.$form.createForm(this)
    };
  },
  methods: {
    exsitCheck: debounce(function(rule, value, callback) {
      this.$store
        .dispatch(types.USER_CHECK, {
          [rule.field]: value
        })
        .then(isExist => (isExist ? callback(false) : callback()));
    }, 300),
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      if (value && value !== this.form.getFieldValue("password")) {
        callback("您输入的确认密码不匹配!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      if (value && this.confirmDirty) {
        this.form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    signup() {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          await this.$store.dispatch(types.USER_CREATE, values);
          this.$message.success("注册成功");
          this.$router.replace("/login");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
