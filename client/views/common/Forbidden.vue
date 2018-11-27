<template>
  <main>
    <Header></Header>
    <section>
      <Icon type="403" :size="160"></Icon>
      <div class="description">
        <h1>您暂时没有权限访问该页面</h1>
        <router-link to="/" replace>回首页
          <a-icon type="enter"/>
        </router-link>
      </div>
    </section>
  </main>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@keyframes shake {
  0% {
    transform: rotateZ(-10deg);
  }
  100% {
    transform: rotateZ(15deg);
  }
}
section {
  display: flex;
  align-items: center;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translateX(-50%);

  .icon {
    transform-origin: bottom;
    animation: shake 2s ease-in-out infinite alternate;
  }

  .description {
    margin-left: 40px;
  }
}
</style>
