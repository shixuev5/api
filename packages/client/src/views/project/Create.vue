<template>
  <a-form layout="vertical" @submit.prevent="handleSubmit" :form="form">
    <a-form-item label="项目名">
      <a-input
        v-decorator="[
          'name',
          { rules: [{ required: true, message: '请输入项目名!' }] }
        ]"
      ></a-input>
    </a-form-item>
    <a-form-item label="所属群组">
      <a-select
        v-decorator="[
          'group_id',
          {
            initialValue: from
          }
        ]"
        showSearch
        allowClear
        optionFilterProp="children"
        :disabled="Boolean(from)"
        :filterOption="filterOption"
      >
        <a-select-option
          v-for="group in groups"
          :key="group._id"
          :title="group.name"
          :value="group._id"
          >{{ group.name }}</a-select-option
        >
      </a-select>
    </a-form-item>
    <a-form-item label="基础路径">
      <a-input
        v-decorator="[
          'path',
          {
            rules: [{ message: '请输入有效的URL!' }]
          }
        ]"
        placeholder="/"
      ></a-input>
    </a-form-item>
    <a-form-item label="项目描述" fieldDecoratorId="">
      <a-textarea
        v-decorator="['desc']"
        placeholder="请简单描述项目信息... (可选)"
        :autosize="{ minRows: 4, maxRows: 6 }"
      ></a-textarea>
    </a-form-item>
    <a-form-item label="项目权限">
      <a-radio-group
        v-decorator="[
          'permission',
          {
            initialValue: 'private'
          }
        ]"
        name="radioGroup"
      >
        <a-radio name="permission" value="private">
          <a-icon type="lock" />私有
          <p>项目访问权限必须明确授权给每个用户。</p>
        </a-radio>
        <a-radio name="permission" value="shared">
          <a-icon type="share-alt" />内部
          <p>该项目允许已登录的用户访问。</p>
        </a-radio>
        <a-radio name="permission" value="public">
          <a-icon type="unlock" />公开
          <p>该项目允许任何人访问。</p>
        </a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        htmlType="submit"
        :disabled="hasErrors(form.getFieldsError())"
        block
        >完成</a-button
      >
    </a-form-item>
  </a-form>
</template>

<script>
import * as types from "@/store/types";
import group from "@/api/group";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default {
  props: {
    from: String
  },
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this),
      groups: []
    };
  },
  methods: {
    filterOption(input, option) {
      return option.componentOptions.children[0].text.indexOf(input) >= 0;
    },
    handleSubmit() {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          await this.$store.dispatch(types.PROJECT_CREATE, values);
          this.$router.push({
            name: "project",
            params: { id: this.$store.state.project.info._id }
          });
        }
      });
    }
  },
  async created() {
    this.groups = await group.find({
      tab: "owner",
      "members.role": "owner"
    });
  }
};
</script>

<style lang="less" scoped>
.ant-radio-wrapper {
  display: block;
  p {
    text-indent: 42px;
    margin-bottom: 0;
  }
}
</style>
