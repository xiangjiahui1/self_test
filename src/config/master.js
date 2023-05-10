import { AdminLayouts, LoginLayouts } from '@/layouts';

export const masterRouterMap = [
  {
    path: '/:pathMatch(.*)',
    redirect: (to) => {
      return { name: '404', query: to.fullPath };
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/404'),
  },
  // {
  //   path: '/log',
  //   redirect: '/login',
  //   component: LoginLayouts,
  //   children: [
  //     {
  //       path: '/login',
  //       name: 'login',
  //       component: () => import('@/views/login/login'),
  //     },
  //   ],
  // },
  {
    path: '',
    name: 'AdminLayouts',
    component: AdminLayouts,
    redirect: 'index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/index'),
        meta: {
          title: '首页',
        },
      },
    ],
  },
];
