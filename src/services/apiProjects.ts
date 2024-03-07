import { formatDate } from '@/libs/helpers'
import { axios } from '@/services/axios'
import type { Projects } from '@/types/globalTypes'
import { deleteTaskByProjectId } from '@/services/apiTasks'

export const getProjects = async () => {
  try {
    const { data } = await axios.get('/projects')
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getProject = async (id: string) => {
  try {
    const { data } = await axios.get(`/projects/${id}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const createProject = async (project: Projects) => {
  try {
    const { id, ...result } = project
    const projectFormatted = {
      ...result,
      startDate: formatDate(project.startDate),
      endDate: formatDate(project.endDate)
    }

    const { data } = await axios.post('/projects', projectFormatted)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updateProject = async (project: Projects) => {
  try {
    const projectFormatted = {
      ...project,
      startDate: formatDate(project.startDate),
      endDate: formatDate(project.endDate)
    }
    const { data } = await axios.put(`/projects/${project.id}`, projectFormatted)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const deleteProject = async (id: string) => {
  try {
    await deleteTaskByProjectId(id)
    const { data } = await axios.delete(`/projects/${id}`)
    return data
  } catch (error) {
    console.log(error)
  }
}
