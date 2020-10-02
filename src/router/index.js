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
    path: '/07',
    name: '07',
    component: () => import(/* webpackChunkName: "experiment-07 */ '../views/07.vue'),
  },
  {
    path: '/08',
    name: '08',
    component: () => import(/* webpackChunkName: "experiment-08" */ '../views/08.vue'),
  },
  {
    path: '/09',
    name: '09',
    component: () => import(/* webpackChunkName: "experiment-09" */ '../views/09.vue'),
  },
  {
    path: '/10',
    name: '10',
    component: () => import(/* webpackChunkName: "experiment-10" */ '../views/10.vue'),
  },
  {
    path: '/11',
    name: '11',
    component: () => import(/* webpackChunkName: "experiment-11" */ '../views/11.vue'),
  },
  {
    path: '/canvas-01',
    name: 'c-01',
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
