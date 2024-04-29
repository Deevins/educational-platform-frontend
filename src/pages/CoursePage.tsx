import { useParams } from 'react-router-dom'
import CoursesPage from '@/pages/CoursesPage.tsx'

type ParamsType = {
  courseID: string
}

const CoursePage = () => {
  const params = useParams<ParamsType>()

  if (params.courseID === 'all') {
    return <CoursesPage />
  }

  return <div>curse {params.courseID}</div>
}

export default CoursePage
