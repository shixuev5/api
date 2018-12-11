import { Tree, Form, Input, InputNumber, Switch } from "ant-design-vue";
import SchemaEditor from './SchemaEditor.vue';

function install(Vue, options = {}) {
  Vue.component('SchemaEditor', SchemaEditor);
  Vue.use(Tree);
  Vue.use(Form);
  Vue.use(Input);
  Vue.use(InputNumber);
  Vue.use(Switch);
}

export default { install };