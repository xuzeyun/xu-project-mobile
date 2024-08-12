import { createRouter, createWebHistory } from 'vue-router'
/* Layout */
import Layout from '@/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/service',
      name: '根',
      component: Layout,
      meta: { title: '', icon: '', allPath: '/' },
      children: [
        {
          path: 'auth',
          name: 'auth',
          component: () => import('@/views/auth/index.vue'),
          meta: { title: '企业认证', icon: '', allPath: '/auth' }
        },
        {
          path: 'go',
          name: 'go',
          component: () => import('@/views/go/index.vue'),
          meta: { title: '申请融资', icon: '', allPath: '/go' }
        }
      ]
    },

    // 首页
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/home/index.vue'),
      meta: { title: '首页', icon: '', allPath: '/login' }
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
      meta: { title: 'login', icon: '', allPath: '/login' }
    }
  ]
})

export default router
