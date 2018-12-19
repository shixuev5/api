<template>
  <a-select
    showSearch
    optionFilterProp="children"
    :value="value"
    :filterOption="filterOption"
    @change="handleChange"
  >
    <a-select-option v-for="item in headerFields" :key="item" :value="item">{{
      item
    }}</a-select-option>
  </a-select>
</template>

<script>
import Types from "vue-types";

export default {
  props: {
    value: Types.string.def("")
  },
  data() {
    return {
      headerFields: [
        "Accept",
        "Accept-Charset",
        "Accept-Encoding",
        "Accept-Language",
        "Accept-Ranges",
        "Age",
        "Allow",
        "Authorization",
        "Cache-Control",
        "Connection",
        "Content-Encoding",
        "Content-Language",
        "Content-Length",
        "Content-Location",
        "Content-MD5",
        "Content-Range",
        "Content-Type",
        "Cookie",
        "Date",
        "ETag",
        "Expect",
        "Expires",
        "From",
        "Host",
        "If-Match",
        "If-Modified-Since",
        "If-None-Match",
        "If-Range",
        "If-Unmodified-Since",
        "Last-Modified",
        "Location",
        "Max-Forwards",
        "Pragma",
        "Proxy-Authenticate",
        "Proxy-Authorization",
        "Range",
        "Referer",
        "Retry-After",
        "Server",
        "Set-Cookie",
        "TE",
        "Trailer",
        "Transfer-Encoding",
        "Upgrade",
        "User-Agent",
        "Vary",
        "Via",
        "WWW-Authenticate",
        "Warning",
        "refresh"
      ]
    };
  },
  methods: {
    handleChange(value) {
      this.$emit("input", value);
    },
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
.ant-select {
  width: 180px;
}
</style>
