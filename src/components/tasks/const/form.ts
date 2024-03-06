import { getProjects } from '@/services/apiProjects'
import type { FormItem, Projects } from '@/types/globalTypes'

export const items = async (): Promise<FormItem[]> => {
  const projects: Projects[] = await getProjects()
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
      label: 'Name',
      variant: 'text',
      placeholder: 'Name'
    },
    {
      type: 'select',
      name: 'projectId',
      label: 'Project',
      variant: 'select',
      placeholder: 'Project',
      options
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
      type: 'checkbox',
      name: 'status',
      label: 'Status',
      variant: 'text',
      placeholder: 'Status'
    }
  ]
}
