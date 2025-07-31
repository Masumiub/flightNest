import axios from 'axios'

const axiosSecureBooking = axios.create({
  baseURL: 'https://flight-server-six.vercel.app/',
})

// Attach token to each request
axiosSecureBooking.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axiosSecureBooking