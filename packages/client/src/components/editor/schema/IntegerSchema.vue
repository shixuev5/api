<template>
  <div class="container">
    <section>
      <h3 class="title-bar">详细</h3>
      <a-form layout="inline">
        <a-form-item>
          <a-tooltip slot="label" title="最大值" placement="top">
            maximum
          </a-tooltip>
          <a-input-number
            :step="0.1"
            v-model="value.maximum"
            style="width: 200px;"
          />
        </a-form-item>
        <a-form-item>
          <a-tooltip slot="label" title="不包含最大值" placement="top">
            exclusiveMaximum
          </a-tooltip>
          <a-switch v-model="value.exclusiveMaximum" />
        </a-form-item>
        <br />
        <a-form-item>
          <a-tooltip slot="label" title="最小值" placement="top">
            minimum
          </a-tooltip>
          <a-input-number
            :step="0.1"
            v-model="value.minimum"
            style="width: 200px;"
          />
        </a-form-item>
        <a-form-item>
          <a-tooltip slot="label" title="不包含最小值" placement="top">
            exclusiveMinimum
          </a-tooltip>
          <a-switch v-model="value.exclusiveMinimum" />
        </a-form-item>
        <br />
        <a-form-item>
          <a-tooltip slot="label" title="不包含最小值" placement="top">
            multipleOf
          </a-tooltip>
          <a-input-number
            :step="0.1"
            v-model="value.multipleOf"
            style="width: 200px;"
          />
        </a-form-item>
        <br />
        <a-form-item>
          <a-tooltip slot="label" title="枚举" placement="top">
            enum
          </a-tooltip>
          <a-textarea
            v-model="value.enum"
            placeholder="逗号分割 例如: 1.1,1.2"
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
      return JSON.stringify(omit(this.value, ["id", "parentId"]), null, 2);
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
    &:nth-child(2),
    &:nth-child(5) {
      .ant-form-item-label {
        width: 140px;
      }
    }
  }
}
</style>
