import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} from '@/services/projects'
import type { Projects } from '@/types/globalTypes'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: ref(<Projects[]>[]),
    projectsId: ref(<string[]>[])
  }),
  actions: {
    async fetchProjects() {
      const data = await getProjects()
      this.projects = data
      this.projectsId = data.map((project: Projects) => project.id)
    },

    async fetchProject(id: string) {
      const data = await getProject(id)
      return data
    },

    async createProject(project: Projects) {
      const data = await createProject(project)
      this.projects.push(data)
      this.projectsId.push(data.id)
    },

    async updateProject(project: Projects) {
      const { data } = await updateProject(project)
      this.projects = data
    },

    async deleteProject(id: string) {
      await deleteProject(id)
      this.projects = this.projects.filter((p: Projects) => p.id !== id)
      this.projectsId = this.projectsId.filter((p: string) => p !== id)
    }
  }
})
