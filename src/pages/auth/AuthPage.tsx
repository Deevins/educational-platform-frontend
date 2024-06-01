import { Outlet } from 'react-router-dom'
import AuthLayout from '@/layouts/AuthLayout.tsx'

const AuthPage = () => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  )
}

export default AuthPage
