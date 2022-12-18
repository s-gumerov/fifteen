import axios from 'axios'
import { PRAKTIKUM_API_URL } from '../const'

export const axiosInstance = axios.create({
  baseURL: PRAKTIKUM_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
