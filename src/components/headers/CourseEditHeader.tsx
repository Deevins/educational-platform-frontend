import React from 'react'
import { NavLink } from 'react-router-dom'
import { PiGear } from 'react-icons/pi'

const CourseEditHeader: React.FC = () => {
  const courseId = 1
  const courseName = 'Курс по программированию на Python'
  const courseStatus = 'Черновик'
  const videoMaterialCount = 120
  return (
    <header className='flex justify-between items-center bg-gray-700 text-white p-4'>
      <div className='flex items-center'>
        <NavLink to='/instructor/courses' className='mr-4'>
          <button className='bg-transparent hover:bg-gray-600 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded'>
            Назад к курсам
          </button>
        </NavLink>
        <h1 className='text-lg font-bold'>{courseName}</h1>
        <p className='ml-2'>{courseStatus}</p>
        <p className='ml-2'>Загружено {videoMaterialCount} мин видеоматериалов</p>
      </div>
      <div>
        <NavLink to={`/instructor/course/${courseId}/manage/settings`}>
          <button className='bg-transparent text-white font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded'>
            <PiGear className='h-6 w-6' />
          </button>
        </NavLink>
      </div>
    </header>
  )
}

export default CourseEditHeader
