import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
