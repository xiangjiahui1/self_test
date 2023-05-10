import { createRouter, createWebHistory } from 'vue-router';
import { routerMap } from '@/config';
import { masterRouterMap } from '@/config/master';

let routes = [...routerMap, ...masterRouterMap];
export const router = createRouter({
  history: createWebHistory(),
  routes,
});
