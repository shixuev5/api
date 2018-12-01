<template>
  <a-layout>
    <a-layout>
      <div class="explore">
        <Icon type="explore" :size="160" slot="cover"></Icon>
        <div class="explore-description">
          <h1 @click="() => this.$router.push('explore')">
            探索
            <a-icon type="arrow-right" />
          </h1>
          <p>尝试最简单的使用方式</p>
        </div>
      </div>
      <section class="form"><slot></slot></section>
    </a-layout>
    <a-layout-footer>
      <a-icon type="copyright" />2018 API manage system
    </a-layout-footer>
  </a-layout>
</template>

<style lang="less" scoped>
.explore {
  position: absolute;
  display: flex;
  top: 30%;
  left: 15%;
  &-description {
    margin-left: 20px;
    margin-top: 40px;
    h1 {
      cursor: pointer;
      transition: color 0.5s;
      &:hover {
        color: #1890ff;
      }
      .anticon {
        animation: fadeIn 2s infinite;
      }
    }
  }
}
.form {
  position: absolute;
  right: 200px;
  top: 30%;
  width: 280px;
}
.ant-layout-footer {
  text-align: center;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1.1);
    transform: translate3d(30px, 0, 0);
  }
}
</style>
