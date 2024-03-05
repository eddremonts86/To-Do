export function sliceText(text: string, start: number = 0, end: number) {
  if (!text) return ''
  return text.length >= end ? text.slice(start, end) + ' ...' : text
}

export function formatDate(date: string) {
  if (!date) return new Date().toLocaleDateString()
  return new Date(date).toLocaleDateString()
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