<template>
  <a-list
    :grid="{ gutter: 16, column: 4 }"
    :pagination="{ pageSize: 8 }"
    :dataSource="value"
  >
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-card :class="{ archive: item.archive }" hoverable>
        <template class="ant-card-actions" slot="actions">
          <a-tooltip title="复制" placement="top">
            <a-icon type="copy" @click="onCopy(item)" />
          </a-tooltip>
          <a-tooltip title="归档" placement="top">
            <a-icon type="inbox" @click="onArchive(item)" />
          </a-tooltip>
          <a-tooltip title="编辑" placement="top">
            <a-icon type="edit" @click="onEdit(item)" />
          </a-tooltip>
          <a-tooltip title="删除" placement="top">
            <a-icon type="delete" @click="onDelete(item)" />
          </a-tooltip>
        </template>
        <a-card-meta
          :description="item.desc ? item.desc : '暂无简介'"
          @click="onClick(item)"
        >
          <div slot="title">
            {{ item.name }}
            <a-rate
              :value="isStar(item)"
              :count="1"
              @click.stop.native
              @change="num => onStar(item, num)"
            />
          </div>
          <a-avatar slot="avatar" :size="40">{{ item.name[0] }}</a-avatar>
        </a-card-meta>
      </a-card>
    </a-list-item>
  </a-list>
</template>

<script>
import Types from "vue-types";
import * as types from "@/store/types";

export default {
  props: {
    value: Types.array.def([])
  },
  data() {
    return {};
  },
  methods: {
    isStar(item) {
      return item.stars.find(star => star._id === this.$user.info._id) ? 1 : 0;
    },
    onCopy() {},
    onArchive(item) {
      // await project.update(item._id, { archive: true });
    },
    onEdit() {},
    async onStar(item, num) {
      if (num) {
        await this.$store.dispatch(types.PROJECT_STAR, item._id);
        this.$message.success("项目关注成功！");
      } else {
        await this.$store.dispatch(types.PROJECT_UNSTAR, item._id);
      }
    },
    onDelete(project) {
      const confirmMsg = `${this.$user.info.name}/${project.name}`;
      this.$confirm({
        title: "删除确认",
        content: (
          <div>
            <p>删除操作将会清空项目包含的所有数据，且操作无法回滚！</p>
            <p>
              请输入
              <strong>{confirmMsg}</strong>
              进行确认：
            </p>
            <a-input placeholder={confirmMsg} />
          </div>
        ),
        okType: "danger",
        okText: "删除",
        maskClosable: true,
        onOk() {
          return new Promise((resolve, reject) => {});
        }
      });
    },
    onClick(item) {
      this.$router.push({
        name: "project",
        params: { id: item._id }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.ant-list {
  margin-top: 16px;

  .archive {
    position: relative;
    overflow: hidden;
    &:after {
      position: absolute;
      top: 10px;
      right: -40px;
      width: 100px;
      height: 20px;
      line-height: 20px;
      content: "已归档";
      text-align: center;
      color: #fff;
      font-size: 12px;
      background: #1890ff;
      box-shadow: 0 0 10px #1890ff;
      transform: rotateZ(45deg);
      transform-origin: top center;
    }
  }
}
</style>
