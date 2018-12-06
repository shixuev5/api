<template>
  <section>
    <a-breadcrumb>
      <a-breadcrumb-item href=""> <a-icon type="home" /> </a-breadcrumb-item>
      <a-breadcrumb-item href="">
        <a-icon type="user" />
        <span>群组成员</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <h3>新增成员</h3>
    <a-form
      layout="inline"
      @submit="handleSubmit"
      :autoFormCreate="
        form => {
          this.form = form;
        }
      "
    >
      <a-form-item>
        <a-select
          mode="multiple"
          labelInValue
          :value="[]"
          placeholder="选择用户"
          style="width: 240px"
          :filterOption="false"
          @search="fetchUser"
          @change="handleChange"
          :notFoundContent="fetching ? undefined : null"
        >
          <a-spin v-if="fetching" slot="notFoundContent" size="small" />
          <!-- <a-select-option v-for="d in data" :key="d.value">{{
            d.text
          }}</a-select-option> -->
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-select
          defaultValue="visitor"
          style="width: 120px"
          @change="handleChange"
        >
          <a-select-option value="visitor">访客</a-select-option>
          <a-select-option value="devloper">开发者</a-select-option>
          <a-select-option value="owner">拥有者</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" htmlType="submit"> 加入群组 </a-button>
      </a-form-item>
    </a-form>
  </section>
</template>

<script>
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default {
  data() {
    return {
      fetching: false,
      hasErrors,
      form: null
    };
  },
  computed: {
    group() {
      return this.$store.state.group.info;
    }
  },
  methods: {
    fetchUser() {},
    handleChange() {},
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
section {
  max-width: 1080px;
  margin: 0 auto;
  .ant-breadcrumb {
    margin: 16px 0;
  }
  .ant-form {
    float: right;
  }
}
</style>
