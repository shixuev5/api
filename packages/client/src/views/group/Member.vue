<template>
  <section>
    <div class="header">
      <Indicator>群组成员管理</Indicator>
      <p>您当前的群组角色为：访客</p>
    </div>
    <h3 class="title">新增成员</h3>
    <a-form layout="inline" @submit.prevent="handleSubmit" :form="form">
      <a-form-item>
        <a-select
          v-decorator="[
            'usersIds',
            {
              rules: [
                {
                  required: true,
                  message: '请选择用户!',
                  type: 'array'
                }
              ]
            }
          ]"
          mode="multiple"
          labelInValue
          style="width: 600px"
          :filterOption="false"
          @search="fetchUser"
          :notFoundContent="fetching ? undefined : null"
        >
          <a-spin v-if="fetching" slot="notFoundContent" size="small" />
          <a-select-option v-for="user in users" :key="user.value">
            {{ user.text }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-select
          v-decorator="[
            'role',
            {
              initialValue: 'visitor',
              rules: [{ required: true, message: '请选择成员角色!' }]
            }
          ]"
          style="width: 120px"
        >
          <a-select-option value="visitor">访客</a-select-option>
          <a-select-option value="devloper">开发者</a-select-option>
          <a-select-option value="owner">拥有者</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" htmlType="submit">加入群组</a-button>
      </a-form-item>
    </a-form>
    <h3 class="title">成员列表</h3>
  </section>
</template>

<script>
import Types from "vue-types";
import * as types from "@/store/types";
import group from "@/api/group";

export default {
  props: {
    id: Types.string.required
  },
  data() {
    return {
      fetching: false,
      form: this.$form.createForm(this),
      selectUsers: [],
      users: []
    };
  },
  computed: {
    info() {
      return this.$store.state.group.info;
    }
  },
  methods: {
    async fetchUser(value) {
      this.fetching = true;
      const response = await group.searchUsers(this.id, { q: value });
      this.fetching = false;
      this.users = response.map(item => ({ text: item.name, value: item._id }));
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          debugger;
          // await group.createMember(this.group.id, values);
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
section {
  max-width: 1080px;
  margin: 0 auto;
  .header {
    display: flex;
    align-items: center;
    height: 80px;
    > * {
      flex: 1;
      text-align: center;
    }
  }
  h3 {
    margin: 24px 0;
  }
}
</style>
