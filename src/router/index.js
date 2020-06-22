import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

// const amount = 5;

// const array = Array.from(Array(amount).keys());

// const testRoutes = {
//   ...array.map((item) => ({
//     path: `/0${item}`,
//     name: `0${item}`,
//     // eslint-disable-next-line prefer-template
//     component: import(/* webpackChunkName:
// "[request]" */ '../views/0' + (item + 1) + '.vue'), /* eslint no-useless-concat: "error" */
//   })),
// };

// const routesAC = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home,
//   },
//   {
//     path: '/default',
//     name: 'default',
//     component: () => import(/* webpackChunkName: "default" */ '../views/_default.vue'),
//   },
// ];

// const object3 = { ...routesAC, ...testRoutes };

// console.log(object3);

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
  {
    path: '/03',
    name: '03',
    component: () => import(/* webpackChunkName: "experiment-03" */ '../views/03.vue'),
  },
  {
    path: '/04',
    name: '04',
    component: () => import(/* webpackChunkName: "experiment-04" */ '../views/04.vue'),
  },
  {
    path: '/05',
    name: '05',
    component: () => import(/* webpackChunkName: "experiment-05" */ '../views/05.vue'),
  },
  {
    path: '/06',
    name: '06',
    component: () => import(/* webpackChunkName: "experiment-06" */ '../views/06.vue'),
  },
  {
    path: '/canvas-01',
    name: '01',
    component: () => import(/* webpackChunkName: "canvas-01" */ '../views/canvas/01.vue'),
  },
];

// console.log(testRoutes);
// console.log(routes);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
