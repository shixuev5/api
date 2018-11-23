<template>
  <div>
    <Header></Header>
    <div class="description">
      <h1>探索 API</h1>
      <p>发现公开的项目、群组，使用 Postman 测试 Api。与他人分享你的项目。</p>
    </div>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style lang="less" scoped>
.description {
  margin: 32px 0;
  text-align: center;
}
main {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
