import axios, { type AxiosHeaders } from 'axios';
import { useTokenStore } from '@/stores/token';

const API_BASE = import.meta.env.VITE_API_BASE;


const request = axios.create({
  baseURL: API_BASE,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  }
});


interface Headers extends AxiosHeaders {
  Authorization: string
}


request.interceptors.request.use((config: any) => {
  const { token } = useTokenStore();
  (config.headers as Headers).Authorization = `Bearer ${token}`
  return config
})

// 相应拦截器
request.interceptors.response.use((response: any) => {
  if (response.data.code !== 200) {
    // do something
    return response;
  }
  return response;
})

export default request;