<template>
  <div id="editor">
    <SchemaTree :value="jsonSchema"></SchemaTree>
    <!-- <Schema type="array"></Schema> -->
  </div>
</template>

<script>
import { isValidSchema, json2schema, jsonParse } from "./utils";
import SchemaTree from "./component/SchemaTree.vue";
// import SchemaEditor from "./component/SchemaEditor.vue";
// import Preview from "./component/Preview.vue";

export default {
  props: {
    value: {
      type: [String, Object],
      default: ""
    }
  },
  components: {
    SchemaTree
    // SchemaEditor
  },
  data() {
    return {
      jsonSchema: {}
    };
  },
  watch: {
    value: {
      async handler(val) {
        // if (isValidSchema(val)) {
        //   this.jsonSchema = jsonParse(val);
        // } else {
        //   }
        this.jsonSchema = await json2schema(val);
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
#editor {
  display: flex;
  width: 100%;
  height: 400px;
}
</style>
