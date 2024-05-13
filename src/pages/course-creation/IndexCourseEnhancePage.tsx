import { NavLink, Outlet, useParams } from 'react-router-dom'
import CourseEditLayout from '@/layouts/CourseEditLayout.tsx'
import React from 'react'

const IndexCourseEnhancePage = () => {
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
    title: 'Сланируйте курс',
    items: [
      { label: 'Целевые учащиеся', checked: false, path: 'goals' },
      { label: 'Структура курса', checked: false, path: 'course-structure' },
      { label: 'Подготовка и тестовое видео', checked: false, path: 'video-setup' },
    ],
  },
  {
    title: 'Создание содержания курса',
    items: [
      { label: 'Съемка видео и монтаж', checked: false, path: 'film' },
      { label: 'Учебный план', checked: false, path: 'curriculum' },
      { label: 'Доступность (необязательно)', checked: false, path: 'accessibility' },
    ],
  },
  {
    title: 'Публикация курса',
    items: [{ label: 'Целевая страница курса', checked: false, path: 'basics' }],
  },
]

const Sidebar: React.FC = () => {
  const { courseID } = useParams()

  return (
    <div className='bg-white p-4 w-[20%] sm:w-1/3 mt-8'>
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
      <button className='bg-purple-600 text-white font-semibold p-2 mt-4 w-full py-4 hover:bg-purple-700'>
        Отправить на проверку
      </button>
    </div>
  )
}

export default IndexCourseEnhancePage
