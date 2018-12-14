import { Table, Tabs, Form, Input, InputNumber, Switch } from "ant-design-vue";
import Index from './Index.vue';

function install(Vue, options = {}) {
  Vue.component('SchemaEditor', Index);
  Vue.use(Table);
  Vue.use(Tabs);
  Vue.use(Form);
  Vue.use(Input);
  Vue.use(InputNumber);
  Vue.use(Switch);
}

export default { install };