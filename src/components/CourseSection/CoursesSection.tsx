import React from 'react'
import CourseCardMini, { Course } from '@/components/CourseSection/CourseCardMini.tsx'
import { NavLink } from 'react-router-dom'

interface CoursesSectionProps {
  courses?: Course[]
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ courses }) => {
  return (
    <div className='container mx-auto py-8'>
      <ArrowLink title={'Все курсы'} />
      <div className='flex flex-wrap'>
        {courses?.length === 0 && <div>Курсов пока нет</div>}
        {courses?.map((course, index) => <CourseCardMini key={index} {...course} />)}
      </div>
    </div>
  )
}

interface ArrowLinkProps {
  title: string
}

const ArrowLink: React.FC<ArrowLinkProps> = ({ title }) => {
  return (
    <NavLink to={'/courses/all'}>
      <div className='flex items-center'>
        <h2 className='text-lg font-bold mr-2'>{title}</h2>
        <div className='transform transition-transform hover:translate-x-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 text-gray-700'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
            <line
              x1='3'
              y1='12'
              x2='16'
              y2='12'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
            />
          </svg>
        </div>
      </div>
    </NavLink>
  )
}

export default CoursesSection
