import type { FormItem } from '@/types/globalTypes'
import { priorityOptions } from '@/components/tasks/const/form'

export const items: FormItem[] = [
  {
    type: 'textField',
    name: 'name',
    label: 'Title',
    variant: 'text',
    placeholder: 'Title',
    required: true
  },
  {
    type: 'textField',
    name: 'subTitle',
    label: 'Subtitle',
    variant: 'text',
    placeholder: 'Subtitle',
    required: true
  },

  {
    type: 'textField',
    name: 'startDate',
    label: 'Start date',
    variant: 'date',
    placeholder: 'Start date'
  },
  {
    type: 'textField',
    name: 'endDate',
    label: 'End date',
    variant: 'date',
    placeholder: 'End date'
  },
  {
    type: 'select',
    name: 'priority',
    label: 'Task(Project) priority',
    variant: 'select',
    placeholder: 'Task(Project) priority',
    options: priorityOptions
  },
  {
    type: 'textArea', // TODO: Add html editor Type: htmlEditor
    name: 'description',
    label: 'Description',
    variant: 'text',
    placeholder: 'Description'
  },
  {
    type: 'checkbox',
    name: 'status',
    label: 'Status',
    variant: 'text',
    placeholder: 'Status'
  },
  {
    type: 'textField',
    name: 'id',
    label: 'id',
    variant: 'text',
    placeholder: 'id'
  }
]
