<template>
  <a-row>
    <a-col :span="4"> <Aside></Aside> </a-col>
    <a-col :span="18" :offset="1">
      <a-tabs
        v-model="activeKey"
        type="editable-card"
        :hideAdd="true"
        @edit="onEdit"
      >
        <a-tab-pane
          v-for="pane in panes"
          :tab="pane.title"
          :key="pane.key"
          :closable="pane.closable"
        >
          <Request></Request>
          <Response></Response>
        </a-tab-pane>
      </a-tabs>
    </a-col>
  </a-row>
</template>

<script>
import Aside from "./Aside";
import Request from "./Request";
import Response from "./Response";

export default {
  components: {
    Aside,
    Request,
    Response
  },
  data() {
    return {
      activeKey: "1",
      panes: [
        {
          title: "GET undefined request",
          key: "1"
        }
      ]
    };
  },
  methods: {
    onEdit(targetKey, action) {
      this[action](targetKey);
    },
    add() {
      const activeKey = "123";
      this.panes.push({
        title: "GET undefined request",
        key: activeKey
      });
      this.activeKey = activeKey;
    },
    remove(targetKey) {}
  }
};
</script>
