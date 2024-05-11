import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CourseRedirectPage: React.FC = () => {
  const { courseID } = useParams()
  const navigate = useNavigate()
  console.log(courseID)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // const response = await fetch(`/api/courses/${id}`)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // const data = await response.json()
        // Предположим, что данные курса содержат массив 'sections'
        // const firstSection = data.sections[0]
        const firstSectionID: number = 412332

        // Предположим, что первый элемент является лекцией
        // const firstLectureId = firstSection.lectures[0].id
        return navigate(`lecture/${firstSectionID}`)
      } catch (error) {
        console.error('Failed to fetch course data', error)
      }
    }

    fetchCourse()
  }, [])

  return <div>Loading...</div>
}

export default CourseRedirectPage
