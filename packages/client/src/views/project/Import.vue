<template>
  <div class="container">
    <section class="header">
      <h2>数据导入</h2>
      <p>支持多数据格式接入，快速融入已有系统。</p>
    </section>
    <section>
      <h3 class="title-bar">数据类型</h3>
      <a-list :grid="{ gutter: 16, column: 4 }" :dataSource="dataSource">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-upload>
            <a-card hoverable>
              <a-card-meta :title="item.title" :description="item.desc">
                <Icon :type="item.icon" :size="64" slot="avatar"></Icon>
              </a-card-meta>
            </a-card>
          </a-upload>
        </a-list-item>
      </a-list>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataSource: [
        {
          title: "JSON",
          icon: "explore",
          desc: "支持Api 1.0版本导出数据接入"
        },
        {
          title: "Chrome",
          icon: "chrome",
          desc: "支持chrome浏览器HAR数据接入"
        },
        {
          title: "Postman",
          icon: "postman",
          desc: "支持Postman 2.0版本数据接入"
        },
        {
          title: "Swagger",
          icon: "swagger",
          desc: "支持swagger 2.1版本数据接入"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.container {
  max-width: 1080px;
  margin: 0 auto;

  section:first-child {
    margin: 24px 0;
    text-align: center;
    border-bottom: 1px solid #eee;
  }

  /deep/ .ant-card-cover {
    text-align: center;
  }
}
</style>
