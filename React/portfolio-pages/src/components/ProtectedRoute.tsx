import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  const auth = sessionStorage.getItem('admin_auth')
  return auth === 'true' ? <Outlet /> : <Navigate to="/admin/login" replace />
}
