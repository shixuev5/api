<template>
  <a-directory-tree
    class="schema-tree"
    :treeData="$manager._treeData"
    multiple
    defaultExpandAll
    @select="onSelect"
    @expand="onExpand"
  >
  </a-directory-tree>
</template>

<script>
import Manager from "@/utils/manager";

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  methods: {
    onSelect() {},
    onExpand() {}
  },
  created() {
    this.$manager = new Manager(this.value);
  }
};
</script>
