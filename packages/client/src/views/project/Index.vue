<template>
  <section>{{ info.name }}</section>
</template>

<script>
export default {
  data() {
    return {
      showGrid: true
    };
  },
  computed: {
    info() {
      return this.$store.state.project.info;
    }
  },
  methods: {
    onSearch() {},
    handleChange() {}
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
