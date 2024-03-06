import Axios from 'axios'

export const axios = Axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }

})
