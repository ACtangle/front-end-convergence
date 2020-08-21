import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to: 即将访问
  // from: 从哪个路径跳转而来
  // next: 函数，代表放行
  if (to.path === '/login') return next()
  if (to.path === '/register') return next()
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  else {
    NProgress.start()
    next()
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
