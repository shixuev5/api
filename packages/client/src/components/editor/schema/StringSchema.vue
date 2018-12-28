<template>
  <div class="container">
    <section>
      <h3 class="title-bar">详细</h3>
      <a-form layout="inline">
        <a-form-item>
          <a-tooltip slot="label" title="最大长度" placement="top">
            maxLength
          </a-tooltip>
          <a-input-number v-model="value.maxLength" style="width: 200px" />
        </a-form-item>
        <a-form-item>
          <a-tooltip slot="label" title="最小长度" placement="top">
            minLength
          </a-tooltip>
          <a-input-number v-model="value.minLength" style="width: 200px" />
        </a-form-item>
        <br />
        <a-form-item>
          <a-tooltip slot="label" title="模式" placement="top">
            pattern
          </a-tooltip>
          <a-input v-model="value.pattern" style="width: 600px" />
        </a-form-item>
        <br />
        <a-form-item>
          <a-tooltip slot="label" title="格式" placement="top">
            format
          </a-tooltip>
          <a-select v-model="value.format" allowClear style="width: 200px">
            <a-select-option value="date-time">date-time</a-select-option>
            <a-select-option value="uri">uri</a-select-option>
            <a-select-option value="email">email</a-select-option>
            <a-select-option value="hostname">hostname</a-select-option>
            <a-select-option value="ipv4">ipv4</a-select-option>
            <a-select-option value="ipv6">ipv6</a-select-option>
          </a-select>
        </a-form-item>
        <br />
        <a-form-item>
          <a-tooltip slot="label" title="枚举" placement="top">
            enum
          </a-tooltip>
          <a-textarea
            v-model="value.enum"
            placeholder="逗号分割 例如: a,b,c"
            :rows="2"
            style="width: 600px"
          />
        </a-form-item>
        <br />
        <a-form-item>
          <a-tooltip slot="label" title="常量" placement="top">
            const
          </a-tooltip>
          <a-textarea v-model="value.const" :rows="2" style="width: 600px" />
        </a-form-item>
      </a-form>
    </section>
    <section>
      <h3 class="title-bar">代码</h3>
      <MonacoEditor
        ref="code"
        :value="code"
        @didChangeModelContent="onChange"
      ></MonacoEditor>
    </section>
  </div>
</template>

<script>
import Types from "vue-types";
import omit from "lodash-es/omit";

export default {
  props: {
    value: Types.object.isRequired
  },
  computed: {
    code() {
      return JSON.stringify(omit(this.value, ["id", "parentId"]), null, 2);
    }
  },
  methods: {
    onChange() {
      this.$refs.code.editor.getValue();
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 16px;
  /deep/ .ant-form-item {
    margin-bottom: 8px;
    &-label {
      width: 100px;
    }
  }
}
</style>
