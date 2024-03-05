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
    const { data } = await axios.post('/tasks', task)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updateTask = async (task: any) => {
  try {
    const { data } = await axios.put(`/tasks/${task.id}`, task)
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