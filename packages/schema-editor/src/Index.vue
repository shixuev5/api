<template>
  <Multipane :style="style">
    <SchemaTree :value="jsonSchema"></SchemaTree>
    <MultipaneResizer></MultipaneResizer>
    <SchemaForm type="array"></SchemaForm>
  </Multipane>
</template>

<script>
import { isValidSchema, json2schema, jsonParse } from "./utils";
import { Multipane, MultipaneResizer } from "vue-multipane";
import SchemaTree from "./component/SchemaTree.vue";
import SchemaForm from "./component/SchemaForm.vue";
// import Preview from "./component/Preview.vue";

export default {
  props: {
    value: {
      type: [String, Object],
      default: ""
    },
    height: {
      type: [Number, String],
      default: "100%"
    }
  },
  components: {
    Multipane,
    MultipaneResizer,
    SchemaTree,
    SchemaForm
  },
  data() {
    return {
      jsonSchema: {}
    };
  },
  computed: {
    style() {
      if (typeof this.height === "string" && this.height.indexOf("%") > -1) {
        return {
          height: this.height
        };
      } else {
        return {
          height: `${parseFloat(this.height)}px`
        };
      }
    }
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
.schema-tree,
.scheme-form {
  width: 50%;
}
.multipane-resizer {
  margin: 0;
  left: 0;
  position: relative;
  &:before {
    display: block;
    content: "";
    width: 3px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -20px;
    margin-left: -1.5px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
  &:hover {
    &:before {
      border-color: #999;
    }
  }
}
</style>
