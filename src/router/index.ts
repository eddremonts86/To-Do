import { createRouter, createWebHistory } from 'vue-router'
import TasksByProjects from '@/components/tasks/TasksByProjects.vue'
import Tasks from '@/views/Tasks.vue'
import Projects from '@/views/Projects.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TasksByProjects
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks
    }
  ]
})

export default router
