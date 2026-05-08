import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Transport from '../pages/Transport.vue'
import Food from '../pages/Food.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/transport', component: Transport },
  { path: '/food', component: Food }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router