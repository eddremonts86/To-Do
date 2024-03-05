import { createRouter, createWebHistory } from 'vue-router'
import TasksByProjects from '@/components/tasks/TasksByProjects.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TasksByProjects
    }
  ]
})

export default router
