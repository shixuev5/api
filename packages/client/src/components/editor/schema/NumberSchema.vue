<template>
  <div class="container">
    <section>
      <h3 class="title-bar">详细</h3>
      <a-form layout="inline">
        <a-form-item>
          <a-tooltip slot="label" title="最大值" placement="top">
            <span style="display: inline-block; width: 120px">maximum</span>
          </a-tooltip>
          <a-input-number :step="0.1" v-model="value.maximum" />
        </a-form-item>
        <a-form-item>
          <a-tooltip slot="label" title="不包含最大值" placement="top">
            exclusiveMaximum
          </a-tooltip>
          <a-switch v-model="value.exclusiveMaximum" />
        </a-form-item>
        <a-form-item>
          <a-tooltip slot="label" title="最小值" placement="top">
            minimum
          </a-tooltip>
          <a-input-number :step="0.1" v-model="value.minimum" />
        </a-form-item>
        <a-form-item>
          <a-tooltip slot="label" title="不包含最小值" placement="top">
            exclusiveMinimum
          </a-tooltip>
          <a-switch v-model="value.exclusiveMinimum" />
        </a-form-item>
        <a-form-item>
          <a-tooltip slot="label" title="不包含最小值" placement="top">
            multipleOf
          </a-tooltip>
          <a-input-number :step="0.1" v-model="value.multipleOf" />
        </a-form-item>
        <br />
        <a-form-item>
          <a-tooltip slot="label" title="枚举" placement="top">
            enum
          </a-tooltip>
          <a-input placeholder="逗号分割 例如: 1.1,1.2" />
        </a-form-item>
        <br />
        <a-form-item>
          <a-tooltip slot="label" title="常量" placement="top">
            const
          </a-tooltip>
          <a-input-number :step="0.1" v-model="value.const" />
        </a-form-item>
      </a-form>
    </section>
    <section>
      <h3 class="title-bar">示例</h3>
      <p></p>
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
  data() {
    return {
      // form: this.$form.
    };
  },
  computed: {
    code() {
      return JSON.stringify(omit(this.value, ["id", "parentId"]), null, 2);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 16px;
}
</style>
