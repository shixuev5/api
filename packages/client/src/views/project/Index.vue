<template>
  <section>{{ project.name }}</section>
</template>

<script>
import Types from "vue-types";
import * as types from "@/store/types";

export default {
  props: {
    id: Types.string.required
  },
  data() {
    return {
      showGrid: true
    };
  },
  computed: {
    project() {
      return this.$store.state.project.info;
    }
  },
  methods: {
    onSearch() {},
    handleChange() {}
  },
  created() {
    this.$store.dispatch(types.PROJECT_INFO, this.id);
  }
};
</script>

<style lang="less" scoped>
section {
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
}
</style>
