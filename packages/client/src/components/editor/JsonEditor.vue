<template>
  <a-tabs :class="{ fullscreen: fullscreen }">
    <a-tab-pane tab="JSON" key="json">
      <MonacoEditor
        ref="json"
        :value="value.value"
        :height="fullscreen ? fullscreenHeight : undefined"
        :option="fullscreenOption"
        @didChangeModelContent="onChange"
      ></MonacoEditor>
    </a-tab-pane>
    <a-tab-pane tab="Editor" key="editor" forceRender>
      <SchemaEditor
        ref="editor"
        :value="jsonSchema"
        :height="fullscreen ? fullscreenHeight : undefined"
      ></SchemaEditor>
    </a-tab-pane>
    <a-tab-pane tab="Schema" key="schema" forceRender>
      <MonacoEditor
        ref="schema"
        readOnly
        :value="jsonSchemaString"
        :height="fullscreen ? fullscreenHeight : undefined"
        :option="fullscreenOption"
      ></MonacoEditor>
    </a-tab-pane>
    <a-icon
      slot="tabBarExtraContent"
      style="padding: 12px 16px"
      :type="fullscreen ? 'fullscreen-exit' : 'fullscreen'"
      @click="onClick"
    />
  </a-tabs>
</template>

<script>
import Types from "vue-types";
import merge from "lodash-es/merge";
import debounce from "lodash-es/debounce";
import cloneDeep from "lodash-es/cloneDeep";
import Schema from "./generate-schema.js";
import { isValidJSON, walkSchema } from "./schema-util.js";

export default {
  props: {
    value: Types.object.def({
      type: "json",
      value: JSON.stringify({})
    })
  },
  data() {
    return {
      fullscreen: false,
      fullscreenHeight: innerHeight - 45,
      jsonString: this.value.value,
      jsonSchema: {}
    };
  },
  watch: {
    jsonString: {
      handler: debounce(function(val) {
        if (!isValidJSON(val)) return;
        this.jsonSchema = merge(
          {},
          this.jsonSchema,
          new Schema(val).getSchema()
        );
      }, 500),
      immediate: true
    }
  },
  computed: {
    fullscreenOption() {
      return {
        contextmenu: this.fullscreen,
        minimap: {
          enabled: this.fullscreen
        }
      };
    },
    jsonSchemaString() {
      const pureSchema = cloneDeep(this.jsonSchema);
      walkSchema(pureSchema, node =>
        ["id", "parentId", "children"].forEach(item => delete node[item])
      );
      return JSON.stringify(pureSchema, null, 2);
    }
  },
  methods: {
    onChange() {
      this.jsonString = this.$refs.json.editor.getValue();
    },
    onClick() {
      this.fullscreen = !this.fullscreen;
    }
  }
};
</script>
