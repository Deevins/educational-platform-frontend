import { Outlet } from 'react-router-dom'
import CourseEditLayout from '@/layouts/CourseEditLayout.tsx'

const IndexCourseEnhancePage = () => {
  return (
    <CourseEditLayout>
      <Outlet />
    </CourseEditLayout>
  )
}

export default IndexCourseEnhancePage
