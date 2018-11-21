<template>
  <div id="user">
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
              fieldDecoratorId="userName"
              :fieldDecoratorOptions="{
                rules: [
                  { required: true, message: 'Please input your username!' }
                ]
              }"
            >
              <a-input placeholder="Username | Email">
                <a-icon
                  slot="prefix"
                  type="user"
                  style="color:rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-item>
            <a-form-item
              :validateStatus="passwordError() ? 'error' : ''"
              :help="passwordError() || ''"
              fieldDecoratorId="password"
              :fieldDecoratorOptions="{
                rules: [
                  { required: true, message: 'Please input your Password!' }
                ]
              }"
            >
              <a-input type="password" placeholder="Password">
                <a-icon
                  slot="prefix"
                  type="lock"
                  style="color:rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                htmlType="submit"
                :disabled="hasErrors(loginForm.getFieldsError())"
                block
                >登陆</a-button
              >
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
              fieldDecoratorId="userName"
              :fieldDecoratorOptions="{
                rules: [
                  { required: true, message: 'Please input your username!' }
                ]
              }"
            >
              <a-input placeholder="Username">
                <a-icon
                  slot="prefix"
                  type="user"
                  style="color:rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-item>
            <a-form-item
              fieldDecoratorId="email"
              :fieldDecoratorOptions="{
                rules: [
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'The input is not valid E-mail!' }
                ]
              }"
            >
              <a-input type="email" placeholder="Email">
                <a-icon
                  slot="prefix"
                  type="mail"
                  style="color:rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-item>
            <a-form-item
              help="password must be at least 6 characters."
              fieldDecoratorId="password"
              :fieldDecoratorOptions="{
                rules: [
                  { required: true, message: 'Please input your Password!' },
                  {
                    validator: this.validateToNextPassword
                  },
                  { min: 6, message: 'password must be at least 6 characters!' }
                ]
              }"
            >
              <a-input type="password" placeholder="Password">
                <a-icon
                  slot="prefix"
                  type="lock"
                  style="color:rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-item>
            <a-form-item
              fieldDecoratorId="confirm"
              :fieldDecoratorOptions="{
                rules: [
                  { required: true, message: 'Please retype your Password!' },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              }"
            >
              <a-input
                type="password"
                placeholder="Confirm Password"
                @blur="handleConfirmBlur"
              >
                <a-icon
                  slot="prefix"
                  type="lock"
                  style="color:rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                htmlType="submit"
                :disabled="hasErrors(signupForm.getFieldsError())"
                block
                >注册</a-button
              >
            </a-form-item>
          </template>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import createUser from "@/graphql/User.graphql";
import { onLogin } from "@/apollo";

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
      // To disabled submit button at the beginning.
      this.loginForm.validateFields();
    });
  },
  methods: {
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.loginForm;
      return isFieldTouched("userName") && getFieldError("userName");
    },
    // Only show error after a field is touched.
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
        callback("confirm passwords that you enter is inconsistent!");
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
          const response = await this.$apollo.mutate({
            mutation: createUser,
            variables: values
          });
          onLogin(this.$apollo, response.data.token);
        }
      });
    },
    signup() {
      this.signupForm.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#user {
  position: absolute;
  left: 50%;
  top: 30%;
  width: 320px;
  margin-left: -160px;
}
</style>
