<template>
  <div class="container" ref="container">
    <section>
      <h2>{{ api.name }}</h2>
      <p>{{ api.path }}</p>
      <a-steps :current="0" size="small" style="text-align: left">
        <a-step title="约定" />
        <a-step title="开发" />
        <a-step title="联调" />
        <a-step title="测试" />
        <a-step title="维护" />
        <a-step title="弃用" />
      </a-steps>
    </section>
    <section>
      <h3 id="basic" class="title-bar">信息</h3>
      <a-form layout="horizontal">
        <a-form-item
          label="接口名称"
          :labelCol="{ span: 2 }"
          :wrapperCol="{ span: 22 }"
        >
          <a-input v-model="api.name"></a-input>
        </a-form-item>
        <a-form-item
          label="所属模块"
          :labelCol="{ span: 2 }"
          :wrapperCol="{ span: 22 }"
        >
          <a-select v-model="api.module_id">
            <a-select-option
              v-for="module in modules"
              :value="module._id"
              :key="module._id"
              >{{ module.name }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item
          label="请求路径"
          :labelCol="{ span: 2 }"
          :wrapperCol="{ span: 22 }"
        >
          <a-input v-model="api.path">
            <a-select
              slot="addonBefore"
              v-model="api.method"
              style="width: 120px"
            >
              <a-select-option value="GET">GET</a-select-option>
              <a-select-option value="POST">POST</a-select-option>
              <a-select-option value="PUT">PUT</a-select-option>
              <a-select-option value="PATCH">PATCH</a-select-option>
              <a-select-option value="DELETE">DELETE</a-select-option>
              <a-select-option value="COPY">COPY</a-select-option>
              <a-select-option value="HEAD">HEAD</a-select-option>
              <a-select-option value="OPTIONS">OPTIONS</a-select-option>
            </a-select>
          </a-input>
        </a-form-item>
      </a-form>
    </section>
    <section>
      <h3 id="request" class="title-bar">请求</h3>
      <a-tabs defaultActiveKey="params">
        <a-tab-pane tab="参数" key="params">
          <RequestParam></RequestParam>
        </a-tab-pane>
        <a-tab-pane tab="请求头" key="headers">
          <RequestHeader></RequestHeader>
        </a-tab-pane>
        <a-tab-pane tab="请求体" key="body" :disabled="api.method === 'GET'">
          <RequestBody></RequestBody>
        </a-tab-pane>
      </a-tabs>
    </section>
    <section>
      <h3 id="response" class="title-bar">响应</h3>
      <SchemaEditor></SchemaEditor>
    </section>
    <section>
      <h3 id="comment" class="title-bar">备注</h3>
      <MarkdownEditor v-model="api.desc"></MarkdownEditor>
    </section>
    <section>
      <h3 id="setting" class="title-bar">设置</h3>
      <div style="height: 1000px"></div>
    </section>
    <a-anchor
      class="anchor"
      :getContainer="() => $refs.container"
      showInkInFixed
    >
      <a-anchor-link href="#basic" title="信息" />
      <a-anchor-link href="#request" title="请求" />
      <a-anchor-link href="#response" title="响应" />
      <a-anchor-link href="#comment" title="备注" />
      <a-anchor-link href="#setting" title="设置" />
    </a-anchor>
    <a-back-top :target="() => $refs.container" />
  </div>
</template>

<script>
import Types from "vue-types";
import RequestParam from "../postman/RequestParam";
import RequestHeader from "../postman/RequestHeader";
import RequestBody from "../postman/RequestBody";

export default {
  components: {
    RequestParam,
    RequestHeader,
    RequestBody
  },
  props: {
    value: Types.object.isRequired
  },
  data() {
    return {
      api: this.value
    };
  },
  computed: {
    modules() {
      return this.$store.state.module.list;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  position: relative;
  max-height: calc(100vh - 104px);
  max-width: 100%;
  padding: 0 160px;
  overflow: auto;

  section:first-child {
    text-align: center;
  }

  section:not(:last-child) {
    margin-bottom: 24px;
  }

  /deep/ .ant-tabs-bar {
    margin-bottom: 0;
  }

  .anchor {
    position: absolute;
    top: 0;
    right: 80px;
  }
}
</style>
