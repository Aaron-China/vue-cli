import Vue from 'vue'
import moment from 'moment'
import './antdUse'
import App from './App.vue'
import router from './router'
import store from '@store/index.js'
import './app.less'

Vue.config.productionTip = false;
Vue.prototype.$moment = moment;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
