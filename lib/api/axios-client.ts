import axios from 'axios'
import { env } from '@/config/env'

export const axiosClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

if (typeof window !== 'undefined') {
  axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')
    if (token && config.headers && typeof config.headers !== 'string') {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
}
