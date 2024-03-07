import { formatDate, sortByKeys } from '@/libs/helpers'
import { axios } from '@/services/axios'
import type { Tasks } from '@/types/globalTypes'

const SORT_PARAMS = ['status', 'name']

export const getTasks = async () => {
  try {
    const { data } = await axios.get('/tasks')
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getTask = async (id: string) => {
  try {
    const { data } = await axios.get(`/tasks/${id}`)
    return sortByKeys(data, SORT_PARAMS)
  } catch (error) {
    console.log(error)
  }
}

export const createTask = async (task: Tasks) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...result } = task
    const taskFormatted = { ...result, date: formatDate(task.date) }
    const { data } = await axios.post('/tasks', taskFormatted)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updateTask = async (task: Tasks) => {
  try {
    const taskFormatted = { ...task, date: formatDate(task.date) }
    const { data } = await axios.put(`/tasks/${task.id}`, taskFormatted)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const deleteTask = async (id: string) => {
  try {
    const { data } = await axios.delete(`/tasks/${id}`)
    return data
  } catch (error) {
    console.log(error)
  }
}
export const deleteTaskByProjectId = async (id: string) => {
  try {
    const tasks = await getTasksByProject(id)
    if (!tasks) return
    const ids = tasks.map((task: any) => task.id)
    const deletePromises = ids.map((id: string) => axios.delete(`/tasks/${id}`))
    await Promise.all(deletePromises)
    return
  } catch (error) {
    console.log(error)
  }
}

export const getTasksByProject = async (projectId: string) => {
  try {
    const { data } = await axios.get(`/tasks?projectId=${projectId}`)
    return sortByKeys(data, SORT_PARAMS)
  } catch (error) {
    console.log(error)
  }
}

export const getTaskByDate = async (date: string) => {
  try {
    const { data } = await axios.get(`/tasks?date=${date}`)
    return sortByKeys(data, SORT_PARAMS)
  } catch (error) {
    console.log(error)
  }
}
