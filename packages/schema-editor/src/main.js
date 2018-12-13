import { Tree, Form, Input, InputNumber, Switch } from "ant-design-vue";
import Vuebar from 'vuebar';
import ContextMenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
import './style/scroll.less';

import Index from './Index.vue';

function install(Vue, options = {}) {
  Vue.component('SchemaEditor', Index);
  Vue.use(Tree);
  Vue.use(Form);
  Vue.use(Input);
  Vue.use(InputNumber);
  Vue.use(Switch);
  Vue.use(ContextMenu);
  Vue.use(Vuebar);
}

export default { install };