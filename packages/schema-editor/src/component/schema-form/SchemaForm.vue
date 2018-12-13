<template>
  <div class="schema-form">
    <keep-alive>
      <component :is="componentName" :value="value"></component>
    </keep-alive>
  </div>
</template>

<script>
import { capitalize } from "@/utils";
import SchemaArray from "./SchemaArray";
import SchemaObject from "./SchemaObject";
import SchemaString from "./SchemaString";
import SchemaBoolean from "./SchemaBoolean";
import SchemaNumber from "./SchemaNumber";
import SchemaInteger from "./SchemaInteger";
import SchemaNull from "./SchemaNull";
import SchemaAny from "./SchemaAny";

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  components: {
    SchemaArray,
    SchemaObject,
    SchemaString,
    SchemaBoolean,
    SchemaNumber,
    SchemaInteger,
    SchemaNull,
    SchemaAny
  },
  computed: {
    componentName() {
      const type = this.value.dataRef ? this.value.dataRef.type : "any";
      return `Schema${capitalize(type)}`;
    }
  }
};
</script>

<style lang="less" scoped></style>
