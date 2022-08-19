import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Detail from "../views/Detail";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      keepalive: true  // 缓存主页
    }
  },
  {
    path: '/detail/:id/:type/:video_link',
    name: 'Detail',
    component: Detail,
    meta: {
      keepalive: false  // 不缓存详情页
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
