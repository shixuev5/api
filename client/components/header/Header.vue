<template>
  <header class="clearfix">
    <Icon class="logo" type="explore" :size="40" slot="cover" @click.native="$router.push('/dashboard')"></Icon>
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
  padding: 0 16px;
  .logo {
    float: left;
    margin: 4px 16px 0 0;
    cursor: pointer;
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
