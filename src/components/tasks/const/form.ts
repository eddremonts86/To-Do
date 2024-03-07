import { getProjects } from '@/services/apiProjects'
import type { FormItem, Projects } from '@/types/globalTypes'

export const priorityOptions = [
  {
    value: 'Low',
    label: 'Low'
  },
  {
    value: 'Medium',
    label: 'Medium'
  },
  {
    value: 'High',
    label: 'High'
  }
]

export const items = async (projectsStore: Projects[]): Promise<FormItem[]> => {
  const projects: Projects[] = projectsStore || (await getProjects())
  const options = projects.map((project: Projects) => {
    return {
      value: project.id,
      label: project.name
    }
  })

  return [
    {
      type: 'textField',
      name: 'name',
      label: 'Title',
      variant: 'text',
      placeholder: 'Title'
    },
    {
      type: 'textField',
      name: 'subTitle',
      label: 'Subtitle',
      variant: 'text',
      placeholder: 'Subtitle'
    },
    {
      type: 'select',
      name: 'projectId',
      label: 'Tasks(Project)',
      variant: 'select',
      placeholder: 'Tasks(Project)',
      options
    },
    {
      type: 'select',
      name: 'priority',
      label: 'Priority',
      variant: 'select',
      placeholder: 'Task priority',
      options: priorityOptions
    },
    {
      type: 'textArea',
      name: 'description',
      label: 'Description',
      variant: 'text',
      placeholder: 'Description'
    },
    {
      type: 'textField',
      name: 'date',
      label: 'Date',
      variant: 'date',
      placeholder: 'Date'
    },
    {
      type: 'textField',
      name: 'id',
      label: 'id',
      variant: 'text',
      placeholder: 'id'
    }
  ]
}
