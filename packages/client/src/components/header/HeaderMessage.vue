<template>
  <div v-if="$user.isLogin">
    <a-badge count="5">
      <a-icon type="message" @click="visible = true" />
    </a-badge>
    <a-drawer
      title="消息中心"
      placement="right"
      :closable="false"
      :visible="visible"
      @close="() => (visible = false)"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
  </div>
</template>

<script>
export default {
  sockets: {
    connect() {
      console.log("socket connected");
    }
  },
  data() {
    return {
      visible: false
    };
  }
};
</script>

<style lang="less" scoped>
.anticon {
  font-size: 24px;
  transition: color 0.3s;
  &:hover {
    cursor: pointer;
    color: #1890ff;
  }
}
</style>
