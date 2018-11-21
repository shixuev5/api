<template>
  <a-tabs :tabBarStyle="{ textAlign: 'center', borderBottom: 'none' }">
    <a-tab-pane tab="登陆" key="login">
      <a-form
        @submit.prevent="login"
        :autoFormCreate="
            loginForm => {
              this.loginForm = loginForm;
            }
          "
      >
        <template v-if="loginForm">
          <a-form-item
            :validateStatus="userNameError() ? 'error' : ''"
            :help="userNameError() || ''"
            fieldDecoratorId="name"
            :fieldDecoratorOptions="{
                rules: [
                  { required: true, message: '请输入您的用户名或者邮箱！' }
                ]
              }"
          >
            <a-input placeholder="用户名 | 邮箱">
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
            </a-input>
          </a-form-item>
          <a-form-item
            :validateStatus="passwordError() ? 'error' : ''"
            :help="passwordError() || ''"
            fieldDecoratorId="password"
            :fieldDecoratorOptions="{
                rules: [
                  { required: true, message: '请输入您的登陆密码!' }
                ]
              }"
          >
            <a-input type="password" placeholder="密码">
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              htmlType="submit"
              :disabled="hasErrors(loginForm.getFieldsError())"
              block
            >完成</a-button>
          </a-form-item>
        </template>
      </a-form>
    </a-tab-pane>
    <a-tab-pane tab="注册" key="signup">
      <a-form
        @submit.prevent="signup"
        :autoFormCreate="
            signupForm => {
              this.signupForm = signupForm;
            }
          "
      >
        <template v-if="signupForm">
          <a-form-item
            fieldDecoratorId="name"
            :fieldDecoratorOptions="{
                rules: [
                  { required: true, message: '请输入您的用户名!' }
                ]
              }"
            hasFeedback
            validateStatus="success"
            help="用户名可使用"
          >
            <a-input placeholder="用户名">
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
            </a-input>
          </a-form-item>
          <a-form-item
            fieldDecoratorId="email"
            :fieldDecoratorOptions="{
                rules: [
                  { required: true, message: '请输入您的邮箱!' },
                  { type: 'email', message: '请输入有效的邮箱地址!' }
                ]
              }"
            hasFeedback
            validateStatus="validating"
            help="The information is being validated..."
          >
            <a-input type="email" placeholder="邮箱">
              <a-icon slot="prefix" type="mail" style="color:rgba(0,0,0,.25)"/>
            </a-input>
          </a-form-item>
          <a-form-item
            help="密码不少于6个字符."
            fieldDecoratorId="password"
            :fieldDecoratorOptions="{
                rules: [
                  { required: true, message: '请输入您的密码!' },
                  {
                    validator: this.validateToNextPassword
                  },
                  { min: 6, message: '密码不少于6个字符!' }
                ]
              }"
          >
            <a-input type="password" placeholder="密码">
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
            </a-input>
          </a-form-item>
          <a-form-item
            fieldDecoratorId="confirm"
            :fieldDecoratorOptions="{
                rules: [
                  { required: true, message: '请再次输入您的密码!' },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              }"
          >
            <a-input type="password" placeholder="确认密码" @blur="handleConfirmBlur">
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              htmlType="submit"
              :disabled="hasErrors(signupForm.getFieldsError())"
              block
            >完成</a-button>
          </a-form-item>
        </template>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import { LOGIN, CREATE_USER } from "@/graphql/User.graphql";
// import { onLogin } from "@/apollo";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default {
  data() {
    return {
      hasErrors,
      confirmDirty: false,
      loginForm: null,
      signupForm: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.loginForm.validateFields();
    });
  },
  methods: {
    userNameError() {
      const { getFieldError, isFieldTouched } = this.loginForm;
      return isFieldTouched("userName") && getFieldError("userName");
    },
    passwordError() {
      const { getFieldError, isFieldTouched } = this.loginForm;
      return isFieldTouched("password") && getFieldError("password");
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      if (value && value !== this.signupForm.getFieldValue("password")) {
        callback("您输入的确认密码不匹配!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      if (value && this.confirmDirty) {
        this.signupForm.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    login() {
      this.loginForm.validateFields(async (err, values) => {
        if (!err) {
          const response = await this.$apollo.query({
            query: LOGIN,
            variables: {
              id: "5bf58191fba5111b56381a6e"
            }
          });
        }
      });
    },
    signup() {
      this.signupForm.validateFields(async (err, values) => {
        if (!err) {
          const response = await this.$apollo.mutate({
            mutation: CREATE_USER,
            variables: values
          });
          // onLogin(this.$apollo, response.data.token);
        }
      });
    }
  }
};
</script>
