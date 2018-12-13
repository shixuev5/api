<template>
  <Multipane :style="style">
    <SchemaTree @select="onSelect"></SchemaTree>
    <MultipaneResizer></MultipaneResizer>
    <SchemaForm :value="nodeSchema"></SchemaForm>
  </Multipane>
</template>

<script>
import { Multipane, MultipaneResizer } from "vue-multipane";
import { resolveSchema } from "./utils";
import Manager from "./utils/manager";
import SchemaTree from "./component/SchemaTree.vue";
import SchemaForm from "./component/schema-form/SchemaForm.vue";
// import Preview from "./component/Preview.vue";

export default {
  provide() {
    return {
      store: new Manager(resolveSchema(this.value))
    };
  },
  props: {
    value: {
      type: String,
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
      nodeSchema: {}
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
  methods: {
    onSelect(selectedKeys, { node }) {
      this.nodeSchema = node;
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
