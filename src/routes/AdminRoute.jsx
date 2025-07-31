import { useContext } from 'react'

import { Navigate } from 'react-router'
import { AuthContext } from '../context/AuthContext'

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  if (loading) return <p>Loading...</p>

  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/login" replace />
  }

  return children
}

export default AdminRoute