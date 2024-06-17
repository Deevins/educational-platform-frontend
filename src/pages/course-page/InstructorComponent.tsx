import React from 'react'
import { Link } from 'react-router-dom'

interface InstructorInfoProps {
  id: number
  name: string
  rating: number
  reviewCount: number
  studentCount: number
  courseCount: number
  description: string
  avatarURL: string
}

export const InstructorComponent: React.FC<InstructorInfoProps> = ({
  id,
  name,
  rating,
  reviewCount,
  studentCount,
  courseCount,
  description,
  avatarURL,
}) => {
  return (
    <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md'>
      <Link to={`/users/user/${id}/profile`}>
        <div className='flex items-center space-x-4'>
          <img src={avatarURL} alt={name} className='w-24 h-24 rounded-full' />
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
      </Link>
      <p className='mt-4 text-gray-800'>{description}</p>
    </div>
  )
}
