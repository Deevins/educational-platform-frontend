import React from 'react'
import { Link } from 'react-router-dom'

export const InstructorComponent: React.FC<InstructorInfoProps> = ({
  id,
  name,
  rating,
  reviewCount,
  studentCount,
  courseCount,
  description,
}) => {
  return (
    <Link
      to={`/users/user/${id}/profile`}
      className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md'
    >
      <div>
        <div className='flex items-center space-x-4'>
          <img
            src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'
            alt={name}
            className='w-24 h-24 rounded-full'
          />
          <div>
            <h1 className='text-xl font-bold'>{name}</h1>
            <div className='flex items-center mt-1'>
              <span className='text-yellow-500 text-xl'>{rating} ★</span>
              <span className='ml-2 text-gray-600'>({reviewCount} Отзывов)</span>
            </div>
            <div className='text-gray-600'>
              <span>{studentCount} Студентов · </span>
              <span>{courseCount} Курсов</span>
            </div>
          </div>
        </div>
        <p className='mt-4 text-gray-800'>{description}</p>
      </div>
    </Link>
  )
}

interface InstructorInfoProps {
  id: string
  name: string
  rating: number
  reviewCount: number
  studentCount: number
  courseCount: number
  description: string
}
