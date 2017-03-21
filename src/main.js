// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource';
import BootstrapVue from 'bootstrap-vue';
import VeeValidate from 'vee-validate';
import { Validator } from 'vee-validate';
import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueResource);
Vue.use(BootstrapVue);
Vue.use(VeeValidate);

Validator.installDateTimeValidators(moment);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
