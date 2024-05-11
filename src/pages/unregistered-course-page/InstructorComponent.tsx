import React from 'react'

export const InstructorComponent: React.FC<InstructorInfoProps> = ({
  name,
  title,
  rating,
  reviewCount,
  studentCount,
  courseCount,
  description,
}) => {
  return (
    <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md'>
      <div className='flex items-center space-x-4'>
        <img
          src='https://img-b.udemycdn.com/user/200_H/16913256_36f3_4.jpg'
          alt={name}
          className='w-24 h-24 rounded-full'
        />
        <div>
          <h1 className='text-xl font-bold'>{name}</h1>
          <p className='text-gray-700'>{title}</p>
          <div className='flex items-center mt-1'>
            <span className='text-yellow-500 text-xl'>{rating} ★</span>
            <span className='ml-2 text-gray-600'>({reviewCount} reviews)</span>
          </div>
          <div className='text-gray-600'>
            <span>{studentCount} students · </span>
            <span>{courseCount} courses</span>
          </div>
        </div>
      </div>
      <p className='mt-4 text-gray-800'>{description}</p>
    </div>
  )
}

interface InstructorInfoProps {
  name: string
  title: string
  rating: number
  reviewCount: number
  studentCount: number
  courseCount: number
  description: string
}
