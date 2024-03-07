import { uniqueId as _uniqueId } from 'lodash'

export function sliceText(text: string, start: number = 0, end: number) {
  if (!text) return ''
  return text.length >= end ? text.slice(start, end) + ' ...' : text
}
export function formatDate(date: string) {
  return date
}

export const formatDateToLocal = (dateStr: string, locale: string = 'en-US') => {
  const date = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }
  const formatter = new Intl.DateTimeFormat(locale, options)
  return formatter.format(date)
}

export const formatDateToNumber = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.getTime()
}

export const formatDateToOther = () => {
  const date = new Date().toISOString().slice(0, 10)
  return date
}


export  const formatDateTest = (dateString: string) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2) // Months are 0 based index
  const day = ('0' + date.getDate()).slice(-2)
  return `${year}-${month}-${day}`
}



export const uniqueId = (text = 'id_') => {
  return _uniqueId(text)
}
