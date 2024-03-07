export type IDictionary = {
  [key: string]: any
}

export type Dictionary<T> = {
  [key: string]: T
}

type BaseAction = {
  id: string
  name: string
  description: string
  status: Boolean
  subTitle?: string
  priority?: string
}

export type Projects = BaseAction & {
  startDate: string
  endDate: string
  completion?: number
  updateId?: string
}

export type Tasks = BaseAction & {
  date: string
  projectId: string
}

interface FormItemOptions {
  value: string
  label: string
  content?: string
  icon?: string
}

export type FormItem = {
  type: string
  name: string
  label: string
  placeholder?: string
  variant?: string
  required?: boolean
  disabled?: boolean
  options?: FormItemOptions[]
}
