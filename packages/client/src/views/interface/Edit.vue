<template>
  <div class="container" ref="container">
    <main>
      <section>
        <h2 style="min-height: 1.5em">{{ api.name }}</h2>
        <p>
          <Method :type="api.method" :size="16"></Method>
          <em style="font-size: 16px; margin: 0 8px">{{ url }}</em>
          <Clipboard :value="url"></Clipboard>
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
            label="请求路径"
            :labelCol="{ span: 2 }"
            :wrapperCol="{ span: 22 }"
          >
            <div style="display: flex">
              <a-select v-model="api.method" style="flex: 0 0 110px">
                <a-select-option value="GET">GET</a-select-option>
                <a-select-option value="POST">POST</a-select-option>
                <a-select-option value="PUT">PUT</a-select-option>
                <a-select-option value="PATCH">PATCH</a-select-option>
                <a-select-option value="DELETE">DELETE</a-select-option>
                <a-select-option value="COPY">COPY</a-select-option>
                <a-select-option value="HEAD">HEAD</a-select-option>
                <a-select-option value="OPTIONS">OPTIONS</a-select-option>
              </a-select>
              <a-tooltip title="项目基础路径" placement="top">
                <span style="line-height: 1">
                  <a-input
                    :value="project.path"
                    disabled
                    style="flex:0 0 160px"
                  />
                </span>
              </a-tooltip>
              <a-tooltip title="模块基础路径" placement="top">
                <span style="line-height: 1">
                  <a-input
                    :value="modulePath"
                    disabled
                    style="flex:0 0 160px"
                  />
                </span>
              </a-tooltip>
              <a-input v-model="api.path" placeholder="/"> </a-input>
            </div>
          </a-form-item>
          <a-form-item
            label="所属模块"
            :labelCol="{ span: 2 }"
            :wrapperCol="{ span: 22 }"
          >
            <a-select
              v-model="api.module_id"
              allowClear
              showSearch
              optionFilterProp="children"
              :filterOption="filterOption"
            >
              <a-select-option
                v-for="module in modules"
                :value="module._id"
                :key="module._id"
                >{{ module.name }}</a-select-option
              >
            </a-select>
          </a-form-item>
          <a-form-item
            label="使用场景"
            :labelCol="{ span: 2 }"
            :wrapperCol="{ span: 22 }"
          >
            <Tags v-model="api.tags"></Tags>
          </a-form-item>
        </a-form>
      </section>
      <section>
        <h3 id="request" class="title-bar">请求</h3>
        <a-tabs defaultActiveKey="path">
          <a-tab-pane tab="路径参数" key="path">
            <RequestPath v-model="api.request.path"></RequestPath>
          </a-tab-pane>
          <a-tab-pane tab="查询参数" key="params">
            <RequestQuery v-model="api.request.query"></RequestQuery>
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
        <a-tabs defaultActiveKey="body">
          <a-tab-pane tab="响应头" key="headers">
            <ResponseHeader v-model="api.response.headers"></ResponseHeader>
          </a-tab-pane>
          <a-tab-pane tab="响应体" key="body">
            <ResponseBody v-model="api.response.body"></ResponseBody>
          </a-tab-pane>
        </a-tabs>
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
    </main>
  </div>
</template>

<script>
import Types from "vue-types";
import { status } from "@/config/constant";
import {
  resolvePathParams,
  resolveQueryParams,
  syncQuery,
  normalizePath
} from "@/utils/postman";
import RequestPath from "./RequestPath";
import RequestQuery from "./RequestQuery";
import RequestHeader from "./RequestHeader";
import RequestBody from "./RequestBody";
import ResponseHeader from "./ResponseHeader";
import ResponseBody from "./ResponseBody";

export default {
  components: {
    RequestPath,
    RequestQuery,
    RequestHeader,
    RequestBody,
    ResponseHeader,
    ResponseBody
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
    project() {
      return this.$store.state.project.info;
    },
    modulePath() {
      const module = this.modules.find(item => item._id === this.api.module_id);
      return module ? module.path : "";
    },
    url() {
      const path = `${this.project.path}/${this.modulePath}/${this.api.path}`;
      return `http://${normalizePath(path)}`;
    },
    step() {
      return Object.keys(this.status).indexOf(this.api.status);
    }
  },
  watch: {
    "api.path": function(val) {
      this.api.request.path = resolvePathParams(val);
      this.api.request.query = resolveQueryParams(val);
    },
    "api.request.query": {
      handler(val) {
        this.api.path = syncQuery(this.api.path, val);
      },
      deep: true
    },
    "api.request.body.type": function() {}
  },
  methods: {
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
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
      text-align: center;
    }

    /deep/ .ant-tabs-bar {
      margin-bottom: 0;
    }

    .anchor {
      position: absolute;
      top: 0;
      right: -60px;
    }
  }
}
</style>
