import { Outlet } from 'react-router-dom'
import InstructorLayout from '@/layouts/InstructorLayout.tsx'

const IndexInstructorPage = () => {
  return (
    <InstructorLayout>
      <Outlet />
    </InstructorLayout>
  )
}

export default IndexInstructorPage
