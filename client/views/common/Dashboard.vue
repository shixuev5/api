<template>
  <div>
    <a-row :style="{ margin: '60px 0' }">
      <a-col :offset="1">
        <h2>快速开始</h2>
        <p>API 管理、请求、测试、Mock、文档、集成...</p>
      </a-col>
    </a-row>
    <a-row :gutter="16" :style="{ margin: '20px 0' }">
      <a-col :span="11" :offset="1">
        <router-link to="/projects/new">
          <a-card hoverable>
            <Icon type="project" :size="56" slot="cover"></Icon>
            <a-card-meta title="新建项目">
              <template slot="description">项目是接口的集合</template>
            </a-card-meta>
          </a-card>
        </router-link>
      </a-col>
      <a-col :span="11">
        <router-link to="/groups/new">
          <a-card hoverable>
            <Icon type="group" :size="56" slot="cover"></Icon>
            <a-card-meta title="新建群组">
              <template slot="description">新建群组以更好的管理项目及多人协助</template>
            </a-card-meta>
          </a-card>
        </router-link>
      </a-col>
    </a-row>
    <a-row :gutter="16" :style="{ margin: '20px 0' }">
      <a-col :span="11" :offset="1">
        <router-link to="/intefaces/new">
          <a-card hoverable>
            <Icon type="interface" :size="56" slot="cover"></Icon>
            <a-card-meta title="新建接口">
              <template slot="description">提供接口流程管理、文档、mock、自动化测试</template>
            </a-card-meta>
          </a-card>
        </router-link>
      </a-col>
      <a-col :span="11">
        <router-link to="/docs">
          <a-card hoverable>
            <Icon type="docs" :size="56" slot="cover"></Icon>
            <a-card-meta title="浏览文档">
              <template slot="description">了解如何高效利用 API 管理系统</template>
            </a-card-meta>
          </a-card>
        </router-link>
      </a-col>
    </a-row>
    <a-modal :closable="false" :maskClosable="false" :keyboard="false" :visible="$user.info.guide">
      <h3>首次登陆</h3>
      <p>请选择您的
        <a-tooltip title="角色有助于系统为您优化操作流程" placement="top" >
        <span style="color: #1890ff"> &lt;用户角色&gt; ?</span>
        </a-tooltip>
      </p>
      <a-radio-group v-model="role" name="role">
        <a-radio value="fe">前端</a-radio>
        <a-radio value="be">后端</a-radio>
        <a-radio value="qa">测试</a-radio>
        <a-radio value="other">其他</a-radio>
      </a-radio-group>
      <p class="tip"><strong style="color: red">重要：</strong>确认后将不可更改，请谨慎选择！</p>
      <a-button slot="footer" type="primary" @click="confirm" block>
        {{count ? '请再次确认' : '确认' }}
      </a-button>
    </a-modal>
  </div>
</template>

<script>
import * as types from "@/store/types";

export default {
  data() {
    return {
      role: "other",
      count: 0
    };
  },
  watch: {
    role() {
      this.count = 0;
    }
  },
  methods: {
    confirm() {
      if (this.count) {
        this.$store.dispatch(types.USER_UPDATE, {
          guide: false,
          role: this.role
        });
      }
      this.count++;
    }
  }
};
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
.tip {
  margin: 1em 0 0 0;
}
</style>
