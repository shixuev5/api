<template>
  <div>
    <keep-alive> <component :is="componentName"></component> </keep-alive>
  </div>
</template>

<script>
import SchemaArray from "./SchemaArray";
import SchemaObject from "./SchemaObject";
import SchemaString from "./SchemaString";
import SchemaBoolean from "./SchemaBoolean";
import SchemaNumber from "./SchemaNumber";
import SchemaInteger from "./SchemaInteger";
import SchemaNull from "./SchemaNull";

export default {
  props: {
    type: {
      required: true,
      validator(val) {
        return (
          [
            "array",
            "object",
            "string",
            "number",
            "integer",
            "boolean",
            "null"
          ].indexOf(val) > -1
        );
      }
    }
  },
  components: {
    SchemaArray,
    SchemaObject,
    SchemaString,
    SchemaBoolean,
    SchemaNumber,
    SchemaInteger,
    SchemaNull
  },
  computed: {
    componentName() {
      return `Schema${this.type[0].toUpperCase() + this.type.slice(1)}`;
    }
  }
};
</script>

<style lang="less" scoped></style>
