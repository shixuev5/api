<template>
  <a-row>
    <a-col :span="20" :offset="2">
      <a-tabs v-model="activeKey" type="editable-card" @edit="onEdit">
        <a-tab-pane
          v-for="pane in panes"
          :tab="pane.title"
          :key="pane.key"
          :closable="pane.closable"
        >
          <a-row :gutter="16">
            <a-col :span="20">
              <a-input defaultValue="mysite" size="large">
                <a-select slot="addonBefore" defaultValue="GET" style="width: 120px">
                  <a-select-option value="GET">GET</a-select-option>
                  <a-select-option value="POST">POST</a-select-option>
                  <a-select-option value="PUT">PUT</a-select-option>
                  <a-select-option value="PATCH">PATCH</a-select-option>
                  <a-select-option value="DELETE">DELETE</a-select-option>
                  <a-select-option value="COPY">COPY</a-select-option>
                  <a-select-option value="HEAD">HEAD</a-select-option>
                  <a-select-option value="OPTIONS">OPTIONS</a-select-option>
                </a-select>
                <span slot="addonAfter">参数</span>
              </a-input>
            </a-col>
            <a-col :span="2">
              <a-button type="primary" size="large" block>发送</a-button>
            </a-col>
            <a-col :span="2">
              <a-button type="primary" size="large" block>保存</a-button>
            </a-col>
          </a-row>

          <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="dataSource" :showHeader="false" size="small" />

          <a-tabs defaultActiveKey="1">
            <a-tab-pane tab="Tab 1" key="1">Content of Tab Pane 1</a-tab-pane>
            <a-tab-pane tab="Tab 2" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
            <a-tab-pane tab="Tab 3" key="3">Content of Tab Pane 3</a-tab-pane>
          </a-tabs>
          <a-card :loading="true" :bordered="false" title="响应">whatever content</a-card>
        </a-tab-pane>
      </a-tabs>
    </a-col>
  </a-row>
</template>

<script>
const columns = [
  {
    title: "Name",
    dataIndex: "name"
  },
  {
    title: "Age",
    dataIndex: "age"
  },
  {
    title: "Address",
    dataIndex: "address"
  }
];
const dataSource = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park"
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park"
  }
];

export default {
  data() {
    const panes = [
      { title: "Tab 1", content: "Content of Tab 1", key: "1" },
      { title: "Tab 2", content: "Content of Tab 2", key: "2" },
      { title: "Tab 3", content: "Content of Tab 3", key: "3", closable: false }
    ];
    return {
      activeKey: panes[0].key,
      panes,
      newTabIndex: 0,
      columns,
      dataSource,
      selectedRowKeys: []
    };
  },
  methods: {
    onSelectChange() {},
    callback(key) {
      console.log(key);
    },
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
