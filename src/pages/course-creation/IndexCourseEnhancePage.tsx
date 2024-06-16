import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom'
import CourseEditLayout from '@/layouts/CourseEditLayout.tsx'
import React, { useState } from 'react'
import axios from 'axios'

const IndexCourseEnhancePage: React.FC = () => {
  return (
    <CourseEditLayout>
      <div className='flex min-h-screen justify-center'>
        <div className='flex flex-col md:flex-row'>
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </CourseEditLayout>
  )
}

type SidebarSection = {
  title: string
  items: SidebarItem[]
}

type SidebarItem = {
  label: string
  checked: boolean
  path: string
}

const sidebarData: SidebarSection[] = [
  {
    title: 'Спланируйте курс',
    items: [
      { label: 'Целевые учащиеся', checked: false, path: 'goals' },
      { label: 'Структура курса', checked: false, path: 'course-structure' },
    ],
  },
  {
    title: 'Создание содержания курса',
    items: [
      { label: 'Съемка видео и монтаж', checked: false, path: 'film' },
      { label: 'Учебный план', checked: false, path: 'curriculum' },
    ],
  },
  {
    title: 'Публикация курса',
    items: [{ label: 'Целевая страница курса', checked: false, path: 'basics' }],
  },
]

const Sidebar: React.FC = () => {
  const { courseID } = useParams<{ courseID: string }>()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleButtonClick = async () => {
    setIsModalOpen(true)
    await axios
      .post(`http://localhost:8080/courses/send-for-approval/${courseID}`)
      .then(() => {
        setIsModalOpen(false)
        navigate('/instructor/courses')
      })
  }

  return (
    <div className='bg-white p-4 w-full sm:w-1/3 mt-8'>
      {sidebarData.map((section, sIndex) => (
        <div key={sIndex}>
          <div className='text-lg font-bold mb-2'>{section.title}</div>
          {section.items.map((item, iIndex) => (
            <div key={iIndex} className='flex items-center mb-2'>
              <NavLink
                key={item.path}
                to={`/instructor/courses/course/${courseID}/manage/${item.path}`}
                className={({ isActive }) =>
                  `block p-2 text-sm text-gray-600 hover:bg-gray-50 w-full font-semibold ${
                    isActive ? 'border-l-4 border-blue-500' : 'hover:bg-gray-200'
                  }`
                }
                end
              >
                {item.label}
              </NavLink>
            </div>
          ))}
        </div>
      ))}
      <button
        className='bg-gray-600 text-white font-semibold p-2 mt-4 w-full py-4 hover:bg-gray-700'
        onClick={handleButtonClick}
      >
        Отправить на проверку
      </button>

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
            <h2 className='text-xl font-semibold mb-4'>
              Ваш курс успешно отправлен на проверку, и в случае положительного результата
              будет опубликован на нашей платформе
            </h2>
          </div>
        </div>
      )}
    </div>
  )
}

export default IndexCourseEnhancePage
