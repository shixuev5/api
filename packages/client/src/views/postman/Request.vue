<template>
  <div>
    <p>
      {{ value.path }}
      <Clipboard v-show="value.path" :value="value.path"></Clipboard>
    </p>
    <RequestUrl :value="value"></RequestUrl>
    <a-tabs defaultActiveKey="params">
      <a-tab-pane tab="参数" key="params">
        <RequestParam></RequestParam>
      </a-tab-pane>
      <a-tab-pane tab="请求头" key="headers" forceRender>
        <RequestHeader></RequestHeader>
      </a-tab-pane>
      <a-tab-pane
        tab="请求体"
        key="body"
        :disabled="value.method === 'GET'"
        forceRender
      >
        <RequestBody></RequestBody>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Types from "vue-types";
import RequestUrl from "./RequestUrl.vue";
import RequestParam from "./RequestParam.vue";
import RequestHeader from "./RequestHeader.vue";
import RequestBody from "./RequestBody.vue";

export default {
  components: {
    RequestUrl,
    RequestParam,
    RequestHeader,
    RequestBody
  },
  props: {
    value: Types.object.def({
      path: "",
      method: "GET",
      request: {
        headers: [],
        params: [],
        body: {}
      }
    })
  },
  methods: {
    onSelectChange() {},
    onChange() {},
    handleChange() {}
  }
};
</script>

<style lang="less">
.ant-table-small {
  border: none;
}
.ant-select-dropdown-menu {
  max-height: 300px;
}
</style>
