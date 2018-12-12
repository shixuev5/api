import Vue from 'vue'
import SchemaEditor from '@/main';
import App from './App'

Vue.config.productionTip = false

Vue.use(SchemaEditor);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render(h) {
    return h(App);
  }
})