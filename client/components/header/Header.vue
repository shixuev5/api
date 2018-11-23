<template>
  <header class="clearfix">
    <Icon class="logo" type="explore" :size="46" slot="cover"></Icon>
    <HeaderNav></HeaderNav>
    <div class="header-right">
      <HeaderAdd></HeaderAdd>
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
    float: right;
    display: flex;
    align-items: center;
    height: 47px;
    > * {
      margin: 0 8px;
    }
  }
}
</style>
