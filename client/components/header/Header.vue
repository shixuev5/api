<template>
  <header class="clearfix">
    <Icon class="logo" type="explore" :size="48" slot="cover"></Icon>
    <HeaderNav></HeaderNav>
    <div class="header-right">
      <HeaderSearch></HeaderSearch>
      <HeaderMessage></HeaderMessage>
      <HeaderUser></HeaderUser>
    </div>
  </header>
</template>

<style lang="less" scoped>
header {
  border-bottom: 1px solid #e8e8e8;
  padding: 0 24px;
  .logo {
    float: left;
  }
  .header-nav {
    float: left;
    border-bottom: none;
  }
  .header-right {
    display: flex;
    align-items: center;
    float: right;
    height: 48px;
    justify-content: space-between;
    width: 300px;
  }
}
</style>
