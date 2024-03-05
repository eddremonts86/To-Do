type BaseAction = {
  id: string
  name: string
  description: string
  status: Boolean
}

export type Projects = BaseAction & {
  startDate: string
  endDate: string
  completion?: number
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
