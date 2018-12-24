<template>
  <div class="container">
    <section>
      <h2>成员管理</h2>
      <p>您当前的项目角色为：{{ role }}</p>
    </section>
    <section>
      <h3 class="title-bar">新增成员</h3>
      <a-form layout="inline" @submit.prevent="handleSubmit" :form="form">
        <a-form-item>
          <a-select
            v-decorator="[
              'usersIds',
              {
                rules: [
                  {
                    required: true,
                    message: '请选择需要新增的用户!',
                    type: 'array'
                  }
                ]
              }
            ]"
            mode="multiple"
            style="width: 540px"
            placeholder="搜索并选择用户(支持多选)"
            :notFoundContent="fetching ? undefined : null"
            :filterOption="false"
            @search="fetchUser"
          >
            <a-spin v-if="fetching" slot="notFoundContent" size="small" />
            <a-select-option v-for="user in users" :key="user._id">{{
              user.name
            }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-select
            style="width: 160px"
            v-decorator="[
              'role',
              {
                initialValue: 'visitor',
                rules: [{ required: true, message: '请选择成员角色!' }]
              }
            ]"
          >
            <a-select-option value="visitor">访客</a-select-option>
            <a-select-option value="devloper">开发者</a-select-option>
            <a-select-option value="owner">拥有者</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-date-picker
            v-decorator="['expired']"
            allowClear
            placeholder="选择授权过期时间"
            :disabledDate="disabledDate"
          />
        </a-form-item>
        <a-form-item style="margin-right: 0">
          <a-button style="width: 160px" type="primary" htmlType="submit"
            >加入项目</a-button
          >
        </a-form-item>
      </a-form>
    </section>
    <section>
      <h3 class="title-bar">成员列表</h3>
      <a-card>
        <span slot="title">
          {{ info.name }}
          <a-divider type="vertical" />
          <span style="font-size: 14px; font-weight: normal"
            >拥有 {{ membersInfo.total }} 个成员：拥有者
            {{ membersInfo.owner || 0 }} 个，开发者
            {{ membersInfo.visitor || 0 }} 个，访客
            {{ membersInfo.developer || 0 }} 个</span
          >
        </span>
        <span slot="extra">
          <a-input-search
            v-model="condition.name"
            placeholder="通过名称搜索"
            style="width: 200px"
          />
          <a-select
            v-model="condition.sort"
            style="width: 120px; marginLeft: 8px;"
          >
            <a-select-option value="updatedAt|desc">最近更新</a-select-option>
            <a-select-option value="updatedAt|asc">最早更新</a-select-option>
            <a-select-option value="createdAt|desc">最近创建</a-select-option>
            <a-select-option value="createdAt|asc">最早创建</a-select-option>
          </a-select>
        </span>
        <a-list itemLayout="horizontal" :dataSource="info.members">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-select slot="actions" :value="item.role" style="width: 100px">
              <a-select-option value="visitor">访客</a-select-option>
              <a-select-option value="devloper">开发者</a-select-option>
              <a-select-option value="owner">拥有者</a-select-option>
            </a-select>
            <a-list-item-meta :title="item.name || 'a'" description="授权于">
              <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-card>
    </section>
  </div>
</template>

<script>
import Types from "vue-types";
import countBy from "lodash-es/countBy";
import { role } from "@/config/constant";
import * as types from "@/store/types";
import project from "@/api/project";

export default {
  props: {
    id: Types.string.isRequired
  },
  data() {
    return {
      fetching: false,
      form: this.$form.createForm(this),
      selectUsers: [],
      users: [],
      condition: {
        name: "",
        sort: "updatedAt|desc"
      }
    };
  },
  computed: {
    info() {
      return this.$store.state.project.info;
    },
    membersInfo() {
      const statistic = countBy(this.info.members, i => i.role);
      statistic.total = this.info.members.length;
      return statistic;
    },
    role() {
      const item = this.info.members.find(
        item => item._id === this.$user.info._id
      );
      return role[item.role || "visitor"];
    }
  },
  methods: {
    disabledDate(currentDate) {
      return currentDate < Date.now();
    },
    async fetchUser(value) {
      this.fetching = true;
      this.users = await project.searchUsers(this.id, { q: value });
      this.fetching = false;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.expired) values.expired = values.expired.format("x");
          debugger;
          // await project.createMember(this.project.id, values);
        }
      });
    }
  },
  created() {
    this.$store.dispatch(types.GROUP_INFO, this.id);
  }
};
</script>

<style lang="less" scoped>
.container {
  max-width: 1080px;
  margin: 0 auto;

  section {
    margin-bottom: 24px;
  }
  section:first-child {
    margin: 24px 0;
    text-align: center;
    border-bottom: 1px solid #eee;
  }
}
</style>
