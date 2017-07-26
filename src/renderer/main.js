import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import App from './App';
import router from './router';
import store from './store';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      const accessKey = localStorage.getItem('accessKey');
      const secretKey = localStorage.getItem('secretKey');

      // check the exist of AK and SK
      let hasKey = true;
      if (accessKey == null || secretKey == null) {
        hasKey = false;
      }

      if (hasKey === true) {
        this.$router.push('/bucket');
      } else {
        this.$router.push('/login');
      }
    },
  },
}).$mount('#app');
