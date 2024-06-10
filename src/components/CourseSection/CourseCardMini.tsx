import React from 'react'
import { NavLink } from 'react-router-dom'

export interface Course {
  id: string
  title: string
  description: string
}

const getRandomColor = () => {
  const colors = [
    '#F5F5F5', // Белый
    '#F0F0F0', // Светло-серый
    '#E0E0E0', // Серый
    '#D3D3D3', // Светло-серый 2
    '#C0C0C0', // Серый 2
    '#A9A9A9', // Темно-серый
    '#808080', // Темно-серый 2
    '#696969', // Темно-серый 3
    '#DCDCDC', // Грязно-белый
    '#D8D8D8', // Светло-серый 3
    '#B0B0B0', // Серый 3
    '#FFE0E0', // Красный
    '#FFE8E0', // Оранжевый
    '#FFF4E0', // Жёлтый
    '#F0FFE0', // Зелёный
    '#E0FFF8', // Голубой
    '#E0F0FF', // Синий
    '#F0E0FF', // Фиолетовый
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

const CourseCardMini: React.FC<Course> = ({ title, description, id }) => {
  const color = getRandomColor()

  if (!title) {
    return null
  }

  return (
    <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 hover:scale-110 transition-transform duration-300 ease-in-out hover:cursor-pointer'>
      <NavLink to={`/courses/course/${id}`}>
        <div
          className={`bg-red-500 p-6 rounded-lg shadow-md`}
          style={{ backgroundColor: color }}
        >
          <h3 className='text-lg font-bold'>{title}</h3>
          <p className='mt-2'>{description}</p>
        </div>
      </NavLink>
    </div>
  )
}

export default CourseCardMini
