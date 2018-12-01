<template>
  <main>
    <div class="description">
      <h1>探索 API</h1>
      <p>发现公开的项目、群组，使用 Postman 测试 Api。与他人分享你的项目。</p>
    </div>
    <section><router-view></router-view></section>
  </main>
</template>

<style lang="less" scoped>
main {
  max-width: 1280px;
  margin: 0 auto;
  .description {
    margin: 40px 0;
    text-align: center;
  }
}
</style>
