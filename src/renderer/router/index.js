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
      name: 'bucket',
      component: require('@/pages/bucket'),
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/pages/login'),
    },
    {
      path: '/manage',
      name: 'manage',
      component: require('@/pages/manage'),
    },
    {
      path: '/upload',
      name: 'upload',
      component: require('@/pages/upload'),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
