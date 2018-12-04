<template>
  <a-list
    itemLayout="horizontal"
    :pagination="{ pageSize: 10 }"
    :dataSource="value"
  >
    <a-list-item
      @click="onClick(item)"
      slot="renderItem"
      slot-scope="item, index"
    >
      <a-list-item-meta :description="item.desc">
        <a-avatar slot="avatar" :size="40">{{ item.name[0] }}</a-avatar>
        <div slot="title">
          {{ item.name }}
          <a-tag>{{ showRole(item.members) }}</a-tag>
        </div>
      </a-list-item-meta>
      <div>
        <a-tooltip
          :title="type === 'project' ? '接口' : '项目'"
          placement="top"
        >
          <a-icon :type="type === 'project' ? 'api' : 'profile'" />
          {{ type === "project" ? item.interface_num : item.project_num }}
        </a-tooltip>
        <a-tooltip title="成员" placement="top">
          <a-icon type="team" /> {{ item.members.length }}
        </a-tooltip>
        <a-tooltip
          :title="config[type][item.permission].title"
          placement="left"
        >
          <a-icon :type="config[type][item.permission].icon" />
        </a-tooltip>
      </div>
      <p>{{ timeFormat(item) }}</p>
    </a-list-item>
  </a-list>
</template>

<script>
import Types from "vue-types";
import dayjs from "dayjs";
import timeago from "timeago.js";
import config from "./config.js";

export default {
  props: {
    type: Types.oneOf(["project", "group"]).required,
    value: Types.array.def([])
  },
  data() {
    return {
      config
    };
  },
  methods: {
    showRole(members) {
      const { role } = members.find(item => item._id === this.$user.info._id);
      return this.config.role[role];
    },
    timeFormat(item) {
      if (this.type === "project") {
        return `更新于：${new timeago().format(item.updatedAt, "zh_CN")}`;
      } else {
        return `创建于：${dayjs(item.createdAt).format("YYYY/MM/DD HH:mm")}`;
      }
    },
    onClick({ _id: id }) {
      this.$router.push({ name: this.type, params: { id } });
    }
  }
};
</script>

<style lang="less" scoped>
.ant-list-item {
  padding: 8px;
  transition: background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:hover {
    cursor: pointer;
    background-color: #e6f7ff;
  }
  &-meta {
    align-items: center;
    &-title {
      a {
        color: rgba(0, 0, 0, 0.65);
      }
      .ant-tag {
        margin: 0 8px;
      }
      .anticon {
        color: #faad14;
        font-size: 16px;
        vertical-align: middle;
      }
    }
  }
  /deep/ &-content {
    flex-direction: column;
    text-align: right;
    p {
      margin-bottom: 0;
    }
    span {
      margin: 0 8px;
    }
    .anticon {
      font-size: 16px;
      line-height: 21px;
    }
  }
}
</style>
