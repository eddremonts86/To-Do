import { formatDate, formatDateToLocal, formatDateToNumber, sliceText } from '@/libs/helpers'
import { describe, expect, it } from 'vitest'

describe('sliceText', () => {
  it('should return the sliced text with ellipsis if the text length is greater than or equal to the end index', () => {
    const text = 'Lorem ipsum dolor sit amet'
    const slicedText = sliceText(text, 0, 10)
    expect(slicedText).toBe('Lorem ipsu ...')
  })

  it('should return the original text if the text length is less than the end index', () => {
    const text = 'Lorem ipsum dolor sit amet'
    const slicedText = sliceText(text, 0, 100)
    expect(slicedText).toBe(text)
  })

  it('should return an empty string if the input text is empty', () => {
    const text = ''
    const slicedText = sliceText(text, 0, 10)
    expect(slicedText).toBe('')
  })
})

describe('formatDate', () => {
  it('should return the formatted date in the local date format', () => {
    const date = '2022-01-01'
    const formattedDate = formatDate(date)
    expect(formattedDate).toBe('1/1/2022') // Change the expected date format based on your locale
  })

  it('should return the current date in the local date format if the input date is empty', () => {
    const date = ''
    const formattedDate = formatDate(date)
    const currentDate = new Date().toLocaleDateString() // Change the expected date format based on your locale
    expect(formattedDate).toBe(currentDate)
  })

  it('should return the current date in the local date format if the input date is empty', () => {
    const date = '3/6/2024'
    const formattedDate = formatDateToLocal(date)
    expect(formattedDate).toBe('Mar 6, 2024')
  })

  it('should return the current date in the local date format if the input date is empty', () => {
    const date = '3/6/2024'
    const formattedDate = formatDateToNumber(date)
    expect(formattedDate).toBe(1709679600000)
  })
})
