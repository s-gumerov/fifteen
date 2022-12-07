import axios from "axios";
import { PRAKTIKUM_API_URL, DB_URL_API } from "../const";

export const axiosInstance = axios.create({
  baseURL: PRAKTIKUM_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

export const axiosInstanceDB = axios.create({
  baseURL: DB_URL_API,
  headers: { 'Content-Type': 'application/json' },
})
