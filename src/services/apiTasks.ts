import { formatDate } from '@/libs/helpers'
import { axios } from '@/services/axios'
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
    return data
  } catch (error) {
    console.log(error)
  }
}

export const createTask = async (task: any) => {
  try {
    const taskFormatted = { ...task, date: formatDate(task.date) }
    console.log('🚀 ~ createTask ~ taskFormatted:', taskFormatted)
    const { data } = await axios.post('/tasks', taskFormatted)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updateTask = async (task: any) => {
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
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getTaskByDate = async (date: string) => {
  try {
    const { data } = await axios.get(`/tasks?date=${date}`)
    return data
  } catch (error) {
    console.log(error)
  }
}
