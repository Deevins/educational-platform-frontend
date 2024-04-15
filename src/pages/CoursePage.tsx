import { useParams } from 'react-router-dom'

type ParamsType = {
  courseID: string
}

const CoursePage = () => {
  const params = useParams<ParamsType>()

  return <div>curse {params.courseID}</div>
}

export default CoursePage
