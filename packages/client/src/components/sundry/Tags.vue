<template>
  <div>
    <template v-for="tag in tags">
      <a-tooltip v-if="tag.length > 10" :key="tag" :title="tag">
        <a-tag
          closable
          color="blue"
          :key="tag"
          :afterClose="() => handleClose(tag)"
        >
          {{ `${tag.slice(0, 10)}...` }}
        </a-tag>
      </a-tooltip>
      <a-tag
        v-else
        closable
        color="blue"
        :key="tag"
        :afterClose="() => handleClose(tag)"
      >
        {{ tag }}
      </a-tag>
    </template>
    <a-auto-complete
      v-if="visible"
      autoFocus
      size="small"
      style="width: 80px"
      :value="inputValue"
      :dataSource="dataSource"
      :defaultActiveFirstOption="false"
      :filterOption="false"
      @search="handleSearch"
      @select="handleInputConfirm"
      @blur="handleInputConfirm"
      @keyup.enter.native="handleInputConfirm"
    />
    <a-tag
      v-else
      @click="visible = true"
      style="background: #fff; borderStyle: dashed;"
    >
      <a-icon type="plus" /> 新建
    </a-tag>
  </div>
</template>

<script>
import Types from "vue-types";

export default {
  props: {
    value: Types.array.def([])
  },
  data() {
    return {
      visible: false,
      inputValue: "",
      dataSource: [],
      tags: this.value
    };
  },
  watch: {
    tags(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    handleClose(removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag);
      this.tags = tags;
    },
    handleSearch(value) {
      this.inputValue = value;
      this.dataSource = ["场景1"];
    },
    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      Object.assign(this, {
        tags,
        visible: false,
        inputValue: ""
      });
    }
  }
};
</script>
