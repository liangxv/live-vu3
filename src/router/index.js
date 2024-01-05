import { createRouter, createWebHistory } from 'vue-router'
import AppVue from '@/App.vue'
import indexVue from '@/views/index/index.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  
    { path: '/', component: indexVue },
    { path: '/index/house', component: () => import("../views/index/house.vue"), },

    { path: '/index/car', component: () => import("../views/index/car.vue"), },

    { path: '/house/detail/:id', component: () => import("../views/index/housedetail.vue") },
    { path: '/my', component: () => import("../views/my/index.vue"), },
    { path: '/my/info', component: () => import("../views/my/info.vue"), },
    { path: '/my/setting', component: () => import("../views/my/setting.vue"), },
    { path: '/my/addresslist', component: () => import("../views/my/AddressList.vue"), },
    { path: '/publish', component: () => import("../views/publish/index.vue"), },
    { path: '/publish/housepublish', component: () => import("../views/publish/HousePublish.vue"), },

    {path:'/publish/SecondHandMarket',component:()=> import("../views/publish/SecondHandMarket.vue"),},
    {path:'/publish/SecondFindAll',component:()=> import("../views/publish/SecondFindAll.vue"),},
    // 公共组件路由
    { path: '/sticky', component: () => import("../components/StickyPackage.vue"), },
    { path: '/pay', component: () => import("../components/pay.vue"), },
    { path: '/releasesuccess', component: () => import("../components/ReleaseSuccess.vue"), },
    
  ]
})

export default router
