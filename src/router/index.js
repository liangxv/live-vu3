import { createRouter, createWebHistory } from 'vue-router'
import AppVue from '@/App.vue'
import indexVue from '@/views/index/index.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppVue
    },
    {
      path: '/index',
      component: indexVue
    },
    { path: '/my', component: () => import("../views/my/index.vue"), },
    { path: '/my/info', component: () => import("../views/my/info.vue"), },
    { path: '/my/setting', component: () => import("../views/my/setting.vue"), },
    { path: '/my/addresslist', component: () => import("../views/my/AddressList.vue"), },
    { path: '/publish', component: () => import("../views/publish/index.vue"), },
    { path: '/publish/housepublish', component: () => import("../views/publish/HousePublish.vue"), }
  ]
})

export default router
