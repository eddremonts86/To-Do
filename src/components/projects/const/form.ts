import type { FormItem } from '@/types/globalTypes'

export const items: FormItem[] = [
  {
    type: 'textField',
    name: 'name',
    label: 'Name',
    variant: 'text',
    placeholder: 'Name'
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
    type: 'textArea',
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
  }
]
