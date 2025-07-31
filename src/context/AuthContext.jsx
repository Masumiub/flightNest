import { createContext, useEffect, useState } from 'react'
import axiosInstance from '../hooks/useAxios'
import {jwtDecode} from 'jwt-decode'


export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


useEffect(() => {
  const token = localStorage.getItem('accessToken')

  
  if (token && token.split('.').length === 3) {
    try {
      const decoded = jwtDecode(token)
      setUser(decoded)
    } catch (error) {
      console.error('Invalid token:', error)
      localStorage.removeItem('accessToken') 
    }
  } else {
    localStorage.removeItem('accessToken') 
  }
  setLoading(false)
}, [])


const login = async (email, password) => {
  const res = await axiosInstance.post('/api/login', { email, password })
  const token = res?.data?.data?.token

  if (token && token.split('.').length === 3) {
    localStorage.setItem('accessToken', token)
    const decoded = jwtDecode(token)
    setUser(decoded)
    return decoded
  } else {
    throw new Error('Invalid token received from server')
  }
}

  const register = async (userData) => {
    const res = await axiosInstance.post('/api/register', userData)
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    setUser(null)
    //navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
