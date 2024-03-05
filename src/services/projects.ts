import { axios } from '@/services/axios'
import type { Projects } from '@/types/globalTypes'


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
    const { data } = await axios.post('/projects', project)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updateProject = async (project: Projects) => {
  try {
    const { data } = await axios.put(`/projects/${project.id}`, project)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const deleteProject = async (id: string) => {
  try {
    const { data } = await axios.delete(`/projects/${id}`)
    return data
  } catch (error) {
    console.log(error)
  }
}