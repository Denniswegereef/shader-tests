import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/default',
    name: 'default',
    component: () => import(/* webpackChunkName: "default" */ '../views/_default.vue'),
  },
  {
    path: '/01',
    name: '01',
    component: () => import(/* webpackChunkName: "experiment-01" */ '../views/01.vue'),
  },
  {
    path: '/02',
    name: '02',
    component: () => import(/* webpackChunkName: "experiment-02" */ '../views/02.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
