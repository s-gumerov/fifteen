import axios from 'axios'
import { BASE_URL_API, DB_URL_API } from './const'

export const axiosInstance = axios.create({
  baseURL: BASE_URL_API,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

export const axiosInstanceDB = axios.create({
  baseURL: DB_URL_API,
  headers: { 'Content-Type': 'application/json' },
})
