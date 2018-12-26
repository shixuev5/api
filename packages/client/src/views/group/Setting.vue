<template>
  <div class="container" ref="container">
    <main>
      <section>
        <h2>群组设置</h2>
        <p>管理群组级别信息。</p>
      </section>
      <section>
        <h3 id="basic" class="title-bar">信息</h3>
        <a-form layout="horizontal" :form="form">
          <a-form-item
            label="群组名"
            :labelCol="{ span: 2 }"
            :wrapperCol="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'name',
                { rules: [{ required: true, message: '请输入群组名!' }] }
              ]"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="基础路径"
            :labelCol="{ span: 2 }"
            :wrapperCol="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'path',
                {
                  rules: [{ message: '请输入有效的URL!' }]
                }
              ]"
              placeholder="/"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="群组描述"
            :labelCol="{ span: 2 }"
            :wrapperCol="{ span: 22 }"
          >
            <a-textarea
              v-decorator="['desc']"
              placeholder="请简单描述群组信息... (可选)"
              :autosize="{ minRows: 4, maxRows: 6 }"
            ></a-textarea>
          </a-form-item>
          <a-form-item
            label="群组权限"
            :labelCol="{ span: 2 }"
            :wrapperCol="{ span: 22 }"
          >
            <a-radio-group
              v-decorator="[
                'permission',
                {
                  initialValue: 'private'
                }
              ]"
              name="radioGroup"
            >
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
        </a-form>
      </section>
      <a-anchor
        class="anchor"
        :getContainer="() => $refs.container"
        :offsetTop="24"
        showInkInFixed
      >
        <a-anchor-link href="#basic" title="信息" />
      </a-anchor>
      <a-back-top :target="() => $refs.container" />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this)
    };
  },
  computed: {
    info() {
      return this.$store.state.project.info;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  max-height: calc(100vh - 104px);
  overflow: auto;
  > main {
    position: relative;
    max-width: 1080px;
    padding: 0 40px;
    margin: 0 auto;
    box-sizing: content-box;
    section {
      margin-bottom: 24px;
    }
    section:first-child {
      margin: 24px 0;
      text-align: center;
      border-bottom: 1px solid #eee;
    }

    .label {
      color: rgba(0, 0, 0, 0.85);
      font-size: 14px;
      line-height: 40px;
    }

    .anchor {
      position: absolute;
      top: 0;
      right: -60px;
    }
  }
}
</style>
