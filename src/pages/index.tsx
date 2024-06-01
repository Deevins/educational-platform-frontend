import { MainLayout } from '@/layouts/MainLayout.tsx'
import { Outlet } from 'react-router-dom'

export const IndexPage = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}
