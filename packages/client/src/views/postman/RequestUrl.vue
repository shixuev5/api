<template>
  <a-row :gutter="16">
    <a-col :span="20">
      <a-input
        size="large"
        :value="path"
        @blur="pathBlur"
        @change="pathChange"
        placeholder="请输入请求 URL"
      >
        <a-select
          slot="addonBefore"
          :value="value.method"
          @select="methodSelect"
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
    </a-col>
    <a-col :span="2">
      <a-button type="primary" size="large" @click="requestSend" block
        >发送</a-button
      >
    </a-col>
    <a-col :span="2">
      <a-button type="primary" size="large" @click="requestSave" block
        >保存</a-button
      >
    </a-col>
  </a-row>
</template>

<script>
import Types from "vue-types";
import * as types from "@/store/types";
import { resolveRequestParams, createRequestParams } from "@/utils/postman";

export default {
  props: {
    value: Types.object.required
  },
  data() {
    return {
      path: this.value.path
    };
  },
  methods: {
    methodSelect(val) {
      this.$store.dispatch(types.POSTMAN_UPDATE, {
        key: this.value.key,
        method: val
      });
    },
    pathChange(e) {
      const { value } = e.target;
      const params = resolveRequestParams(value);
      if (params && params.length) {
        debugger;
        // this.$store.dispatch(types.POSTMAN_UPDATE, {
        //   key: this.value.key,
        //   request: {
        //     params: createRequestParams(params)
        //   }
        // });
      }
      this.path = value;
    },
    pathBlur() {
      this.$store.dispatch(types.POSTMAN_UPDATE, {
        key: this.value.key,
        path: this.path
      });
    },
    requestSend() {
      this.$store.dispatch(types.POSTMAN_SEND, this.value.key);
    },
    requestSave() {}
  }
};
</script>

<style lang="less" scoped></style>
