<template>
  <a-table
    :rowSelection="{
      selectedRowKeys: selectedRowKeys,
      onChange: onSelectChange
    }"
    :columns="headersColumns"
    :dataSource="dataSource"
    :pagination="false"
    size="small"
  >
    <template slot="name" slot-scope="text, record">
      <RequestHeaderName></RequestHeaderName>
    </template>
  </a-table>
</template>

<script>
export default {};
</script>

<style lang="less" scoped></style>
