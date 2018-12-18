<template>
  <div class="container" ref="container">
    <section>
      <h2 style="min-height: 1.5em">{{ api.name }}</h2>
      <p>
        <Method :type="api.method" :size="16"></Method> {{ api.path }}
        <Clipboard :value="api.path"></Clipboard>
      </p>
      <a-steps :current="step" size="small" style="text-align: left">
        <a-step v-for="(key, value) in status" :key="key">
          <span
            slot="title"
            @click="api.status = value"
            style="cursor: pointer;"
            >{{ key }}</span
          >
        </a-step>
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
          <RequestParam v-model="api.request.params"></RequestParam>
        </a-tab-pane>
        <a-tab-pane tab="请求头" key="headers">
          <RequestHeader v-model="api.request.headers"></RequestHeader>
        </a-tab-pane>
        <a-tab-pane tab="请求体" key="body" :disabled="api.method === 'GET'">
          <RequestBody v-model="api.request.body"></RequestBody>
        </a-tab-pane>
      </a-tabs>
    </section>
    <section>
      <h3 id="response" class="title-bar">响应</h3>
      <SchemaEditor></SchemaEditor>
    </section>
    <section>
      <h3 id="desc" class="title-bar">备注</h3>
      <MarkdownEditor v-model="api.desc"></MarkdownEditor>
    </section>
    <a-anchor
      class="anchor"
      :getContainer="() => $refs.container"
      showInkInFixed
    >
      <a-anchor-link href="#basic" title="信息" />
      <a-anchor-link href="#request" title="请求" />
      <a-anchor-link href="#response" title="响应" />
      <a-anchor-link href="#desc" title="备注" />
    </a-anchor>
    <a-back-top :target="() => $refs.container" />
  </div>
</template>

<script>
import Types from "vue-types";
import { status } from "@/config/constant";
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
      api: this.value,
      status
    };
  },
  computed: {
    modules() {
      return this.$store.state.module.list;
    },
    step() {
      return Object.keys(this.status).indexOf(this.api.status);
    }
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.container {
  position: relative;
  max-height: calc(100vh - 104px);
  max-width: 1080px;
  padding: 0 40px;
  margin: 0 auto;
  box-sizing: content-box;
  overflow: auto;

  section:first-child {
    text-align: center;
  }

  section {
    margin-bottom: 24px;
  }

  /deep/ .ant-tabs-bar {
    margin-bottom: 0;
  }

  .anchor {
    position: absolute;
    top: 0;
    right: -80px;
  }
}
</style>
