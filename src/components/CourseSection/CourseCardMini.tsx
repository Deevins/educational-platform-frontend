import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaArrowRightLong } from 'react-icons/fa6'

export interface Course {
  title: string
  description: string
  url: string
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

const CourseCardMini: React.FC<Course> = ({ title, description, url }) => {
  const color = getRandomColor()

  return (
    <div className='w-full sm:w-1/2 md:w-1/3 p-4'>
      <div
        className={`bg-red-500 p-6 rounded-lg shadow-md relative`}
        style={{
          backgroundColor: color,
        }}
      >
        <div className='absolute top-0 right-0 mt-2 mr-2'>
          <NavLink to={url}>
            <FaArrowRightLong
              size={20}
              className={
                ' duration-100 ease-in-out transform hover:scale-115 hover:cursor-pointer'
              }
            />
          </NavLink>
        </div>
        <h3 className='text-lg font-bold '>{title}</h3>
        <p className='mt-2 '>{description}</p>
      </div>
    </div>
  )
}

export default CourseCardMini
