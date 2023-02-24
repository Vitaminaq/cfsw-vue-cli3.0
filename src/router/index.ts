import type { RouteRecordRaw } from 'vue-router'
import { createRouter as _createRouter } from 'vue-router'
import { routerHistory } from '@/utils/config'

const Home = () => import('@/views/HomeView.vue')

const routes: RouteRecordRaw[] = [
  /**
   * 首页 - 新
   */
  {
    path: '/:lang?',
    name: 'Home',
    component: Home
  }
]

export function createRouter() {
  return _createRouter({
    history: routerHistory(),
    routes
  })
}
