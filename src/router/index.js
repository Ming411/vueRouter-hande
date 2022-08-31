import Vue from 'vue';
// import VueRouter from 'vue-router';
// import VueRouter from './myRouter.js';
import VueRouter from '../my-vue-router/index';
// import VueRouter from './tcRouter.js';
const routes = [
  {
    path: '/',
    component: () => import('../components/aPage.vue')
  },
  {
    path: '/bpage',
    component: () => import('../components/bPage.vue'),
    children: [
      {
        path: 'cpage',
        component: () => import('../components/cPage.vue')
      }
    ]
  }
];

Vue.use(VueRouter);

const router = new VueRouter({
  routes
  // mode: 'history',
});

export default router;
