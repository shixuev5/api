<template>
  <main>
    <div class="editor-wrap">
      <SchemaEditor v-model="value"></SchemaEditor>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      value: {
        array: [
          {
            key: "键",
            value: "值"
          },
          [
            "另一个数组",
            {
              key: "键",
              value: "值"
            }
          ],
          1.23,
          true,
          "string",
          0
        ],
        object: {
          array: [],
          object: {},
          number: 1.23,
          boolean: true,
          string: "string",
          integer: 0
        },
        number: 1.23,
        boolean: true,
        string: "string",
        integer: 0
      }
    };
  }
};
</script>

<style lang="less" scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .editor-wrap {
    width: 960px;
    height: 600px;
    border: 1px solid #eee;
  }
}
</style>
