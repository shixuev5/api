<template>
  <main>
    <Nav></Nav>
    <slot></slot>
  </main>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}
</style>
