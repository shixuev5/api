<template>
  <a-tabs :class="{ fullscreen: fullscreen }" @change="onChange">
    <a-tab-pane tab="JSON" key="json">
      <MonacoEditor
        ref="json"
        :height="fullscreen ? fullscreenHeight : undefined"
        :option="fullscreenOption"
      ></MonacoEditor>
    </a-tab-pane>
    <a-tab-pane tab="Editor" key="editor" forceRender>
      <SchemaEditor
        ref="editor"
        :value="jsonString"
        :height="fullscreen ? fullscreenHeight : undefined"
      ></SchemaEditor>
    </a-tab-pane>
    <a-tab-pane tab="Schema" key="schema" forceRender>
      <MonacoEditor
        ref="schema"
        :value="jsonSchema"
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
export default {
  data() {
    return {
      jsonString: JSON.stringify(""),
      jsonSchema: null,
      fullscreen: false,
      fullscreenHeight: innerHeight - 45
    };
  },
  computed: {
    fullscreenOption() {
      return {
        contextmenu: this.fullscreen,
        minimap: {
          enabled: this.fullscreen
        }
      };
    }
  },
  methods: {
    onChange(activeKey) {
      if (activeKey === "editor") {
        const val = this.$refs.json.editor.getValue();
        if (val) {
          this.jsonString = val;
        }
      } else if (activeKey === "schema") {
        this.jsonSchema = JSON.stringify(this.$refs.editor.schema, null, 2);
      }
    },
    onClick() {
      this.fullscreen = !this.fullscreen;
    }
  }
};
</script>
