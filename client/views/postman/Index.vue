<template>
  <a-row>
    <a-col :span="4">
      <Aside></Aside>
    </a-col>
    <a-col :span="18" :offset="1">
      <a-tabs v-model="activeKey" type="editable-card" @edit="onEdit">
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
    const panes = [
      {
        title: "GET http://www.baidu.com",
        key: "1"
      }
    ];
    return {
      activeKey: panes[0].key,
      panes
    };
  },
  methods: {
    onEdit(targetKey, action) {
      this[action](targetKey);
    },
    add() {
      const panes = this.panes;
      const activeKey = `newTab${this.newTabIndex++}`;
      panes.push({
        title: "New Tab",
        content: "Content of new Tab",
        key: activeKey
      });
      this.panes = panes;
      this.activeKey = activeKey;
    },
    remove(targetKey) {
      let activeKey = this.activeKey;
      let lastIndex;
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const panes = this.panes.filter(pane => pane.key !== targetKey);
      if (lastIndex >= 0 && activeKey === targetKey) {
        activeKey = panes[lastIndex].key;
      }
      this.panes = panes;
      this.activeKey = activeKey;
    }
  }
};
</script>
