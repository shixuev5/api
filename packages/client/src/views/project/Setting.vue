<template>
  <div class="container" ref="container">
    <main>
      <section>
        <h2>项目设置</h2>
        <p>管理项目级别信息。</p>
      </section>
      <section>
        <h3 id="basic" class="title-bar">信息</h3>
        <a-form layout="horizontal" :form="form">
          <a-form-item
            label="项目名"
            :labelCol="{ span: 2 }"
            :wrapperCol="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'name',
                { rules: [{ required: true, message: '请输入项目名!' }] }
              ]"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="所属群组"
            :labelCol="{ span: 2 }"
            :wrapperCol="{ span: 22 }"
          >
            <a-select
              v-decorator="[
                'group_id',
                {
                  initialValue: from
                }
              ]"
              showSearch
              allowClear
              optionFilterProp="children"
              :filterOption="filterOption"
            >
              <a-select-option
                v-for="group in groups"
                :key="group._id"
                :title="group.name"
                :value="group._id"
                >{{ group.name }}</a-select-option
              >
            </a-select>
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
            label="项目描述"
            :labelCol="{ span: 2 }"
            :wrapperCol="{ span: 22 }"
          >
            <a-textarea
              v-decorator="['desc']"
              placeholder="请简单描述项目信息... (可选)"
              :autosize="{ minRows: 4, maxRows: 6 }"
            ></a-textarea>
          </a-form-item>
          <a-form-item
            label="项目权限"
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
      <section><h3 id="env" class="title-bar">环境</h3></section>
      <section>
        <h3 id="request" class="title-bar">请求</h3>
        <label class="label" for="before_script">before script:</label>
        <MonacoEditor id="before_script" language="javascript"></MonacoEditor>
        <label class="label" for="after_script">after script:</label>
        <MonacoEditor id="after_script" language="javascript"></MonacoEditor>
      </section>
      <section><h3 id="mock" class="title-bar">Mock</h3></section>
      <a-anchor
        class="anchor"
        :getContainer="() => $refs.container"
        :offsetTop="24"
        showInkInFixed
      >
        <a-anchor-link href="#basic" title="信息" />
        <a-anchor-link href="#env" title="环境" />
        <a-anchor-link href="#request" title="请求" />
        <a-anchor-link href="#mock" title="Mock" />
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
