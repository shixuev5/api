<template>
  <div class="container">
    <section>
      <h3 class="title-bar">详细</h3>
      <a-form layout="inline">
        <a-form-item>
          <a-tooltip slot="label" title="最大个数" placement="top">
            maxItems
          </a-tooltip>
          <a-input-number v-model="value.maxItems" style="width: 200px" />
        </a-form-item>
        <a-form-item>
          <a-tooltip slot="label" title="最小个数" placement="top">
            minItems
          </a-tooltip>
          <a-input-number v-model="value.minItems" style="width: 200px" />
        </a-form-item>
        <br />
        <a-form-item>
          <a-tooltip slot="label" title="模式" placement="top">
            uniqueItems
          </a-tooltip>
          <a-switch v-model="value.uniqueItems"></a-switch>
        </a-form-item>
        <br />
        <a-form-item>
          <a-tooltip slot="label" title="包含" placement="top">
            contains
          </a-tooltip>
          <a-input v-model="value.contains" style="width: 600px" />
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
      <MonacoEditor :value="code"></MonacoEditor>
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
      return JSON.stringify(
        omit(this.value, ["id", "parentId", "children", "items"]),
        null,
        2
      );
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
