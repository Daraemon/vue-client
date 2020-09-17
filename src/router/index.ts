import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const Home = () => import('../views/Home.vue')
const About = () => import('../views/About.vue')
const Login = () => import('../views/login/Login.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
