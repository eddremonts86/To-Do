import { getProject, getProjects } from '@/services/apiProjects'
import type { Projects } from '@/types/globalTypes'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { uniqueId } from '@/libs/helpers'

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

    updateProjects(projects: Projects[]) {
      this.projects = projects
    },

    updateProject(project: Projects) {
      this.project = project
    },

    updateTaskDate(date: string) {
      this.taskDate = date
    },

    updateProjectId(id: string) {
      this.projects = this.projects.map((project) => {
        if (project.id === id) {
          project.updateId = uniqueId('project_')
        }
        return project
      })
    }
  }
})
