<template>
  <div>
    <a-row :style="{margin: '40px 0'}">
      <a-col :offset="1">
        <h2>快速开始</h2>
        <p>API 管理、请求、测试、Mock、文档、集成...</p>
      </a-col>
    </a-row>
    <a-row :gutter="16" :style="{margin: '40px 0'}">
      <a-col :span="11" :offset="1">
        <router-link to="/projects/new">
          <a-card hoverable>
            <Icon type="project" :size="48" slot="cover"></Icon>
            <a-card-meta title="创建项目">
              <template slot="description">项目是接口的集合、</template>
            </a-card-meta>
          </a-card>
        </router-link>
      </a-col>
      <a-col :span="11">
        <router-link to="/groups/new">
          <a-card hoverable>
            <Icon type="group" :size="48" slot="cover"></Icon>
            <a-card-meta title="创建群组">
              <template slot="description">创建群组以更好的管理项目及多人协助</template>
            </a-card-meta>
          </a-card>
        </router-link>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11" :offset="7">
       <router-link to="/docs">
          <a-card hoverable>
            <Icon type="docs" :size="48" slot="cover"></Icon>
            <a-card-meta title="浏览文档">
              <template slot="description">了解如何高效利用 API 管理系统</template>
            </a-card-meta>
          </a-card>
        </router-link>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.ant-card {
  display: flex;
  /deep/ &-cover {
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
