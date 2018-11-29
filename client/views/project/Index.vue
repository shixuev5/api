<template>
  <main>
    <ProjectAside></ProjectAside>
    <router-view></router-view>
  </main>
</template>

<script>
import ProjectAside from "./aside/Aside";

export default {
  components: {
    ProjectAside
  }
};
</script>

<style lang="less" scoped>
main {
  display: flex;
}
</style>
