import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: "https://flight-server-six.vercel.app", 
})

export default axiosInstance