<template>
  <main>
    <Aside></Aside>
    <section>
      <slot></slot>
    </section>
  </main>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
main {
  display: flex;
  section {
    flex: 1;
  }
}
</style>
