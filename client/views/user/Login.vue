<script>
import { Form } from "ant-design-vue";
import * as types from "@/store/types";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const LoginForm = {
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.$store.dispatch(types.USER_LOGIN, values);
        }
      });
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.form.validateFields();
    });
  },

  render() {
    const { getFieldDecorator } = this.form;
    return (
      <a-form onSubmit={this.handleSubmit}>
        <a-form-item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "请输入您的用户名或邮箱!" }]
          })(
            <a-input
              prefix={
                <a-icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="用户名 | 邮箱"
            />
          )}
        </a-form-item>
        <a-form-item>
          {getFieldDecorator("password", {
            rules: [
              { required: true, message: "请输入您的密码!" },
              { min: 6, message: "密码不少于6个字符!" }
            ]
          })(
            <a-input
              prefix={
                <a-icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              type="password"
              placeholder="密码"
            />
          )}
        </a-form-item>
        <a-form-item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<a-checkbox>记住我</a-checkbox>)}
          <router-link to="" style={{ float: "right" }}>
            忘记密码
          </router-link>
          <a-button
            disabled={hasErrors(this.form.getFieldsError())}
            type="primary"
            htmlType="submit"
            block
          >
            登陆
          </a-button>
          或 <router-link to="/signup">现在注册</router-link>
        </a-form-item>
      </a-form>
    );
  }
};

export default Form.create()(LoginForm);
</script>
