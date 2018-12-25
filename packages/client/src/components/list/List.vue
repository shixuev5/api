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
      <a-list-item-meta>
        <a-avatar slot="avatar" :size="40">{{ item.name[0] }}</a-avatar>
        <span slot="title">
          {{ item.name }}
          <a-tag>{{ showRole(item.members) }}</a-tag>
        </span>
        <span slot="description">{{ item.desc || "暂无描述" }}</span>
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
import { format } from "timeago.js";
import config from "./config.js";

export default {
  props: {
    type: Types.oneOf(["project", "group"]).isRequired,
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
        return `更新于：${format(item.updatedAt, "zh_CN")}`;
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

  &:hover {
    cursor: pointer;
    .ant-list-item-meta-title {
      color: #1890ff;
    }
  }
  &-meta {
    align-items: center;
    &-title {
      transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      .ant-tag {
        margin: 0 8px;
      }
    }
    &-description {
      min-height: 22px;
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
