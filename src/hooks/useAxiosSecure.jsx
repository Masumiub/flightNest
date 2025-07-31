import axios from 'axios'

const axiosSecure = axios.create({
  baseURL: 'https://flight-server-six.vercel.app/api',
})

// Attach token to each request
axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axiosSecure