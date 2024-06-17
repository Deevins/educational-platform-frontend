import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { PiGear } from 'react-icons/pi'
import useSWR from 'swr'
import { CourseInfo } from '@/pages/course-page/CoursePage.tsx'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const CourseEditHeader: React.FC = () => {
  const courseID = useParams<{ courseID: string }>().courseID
  const { data, error, isLoading } = useSWR<CourseInfo>(
    `http://localhost:8080/courses/get-full-course/${courseID}`,
    fetcher
  )

  if (!data) return <div>Загрузка...</div>

  if (isLoading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка загрузки</div>

  return (
    <header className='flex justify-between items-center bg-gray-700 text-white p-4'>
      <div className='flex items-center'>
        <NavLink to='/instructor/courses' className='mr-4'>
          <button className='bg-transparent hover:bg-gray-600 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded'>
            Назад к курсам
          </button>
        </NavLink>
        <h1 className='text-lg font-bold'>{data.title}</h1>
        <p className='ml-2'>
          {(data.status === 'READY' ? 'Готов' : '') ||
            (data.status === 'DRAFT' ? 'Черновик' : '') ||
            (data.status === 'PENDING' ? 'На модерации' : '')}
        </p>
        <p className='ml-2'>Загружено {data.lectures_length} мин видеоматериалов</p>
      </div>
      <div>
        <NavLink to={`/instructor/courses/course/${courseID}/manage/settings`}>
          <button className='bg-transparent text-white font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded'>
            <PiGear className='h-6 w-6' />
          </button>
        </NavLink>
      </div>
    </header>
  )
}

export default CourseEditHeader
