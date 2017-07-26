import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/landing',
      name: 'landing-page',
      component: require('@/components/LandingPage'),
    },
    {
      path: '/',
      name: 'login',
      component: require('@/pages/Login'),
    },
    {
      path: '/bucket',
      name: 'bucket',
      component: require('@/pages/bucket'),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
