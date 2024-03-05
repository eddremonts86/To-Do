import { getProject, getProjects } from '@/services/apiProjects'
import type { Projects } from '@/types/globalTypes'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: ref(<Projects[]>[]),
    project: ref(<Projects>{}),
    taskDate: ref(<string>new Date().toLocaleDateString())
  }),
  actions: {
    async fetchProjects() {
      const data = await getProjects()
      if (!data) return
      this.projects = data
      return
    },

    async fetchProject(id: string) {
      const data = await getProject(id)
      return data
    },

    updateProject(project: Projects) {
      this.project = project
    },

    updateTaskDate(date: string) {
      this.taskDate = date
    }
  }
})
