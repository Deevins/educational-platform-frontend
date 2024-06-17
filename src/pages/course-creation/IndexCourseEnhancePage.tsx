import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom'
import CourseEditLayout from '@/layouts/CourseEditLayout.tsx'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CourseInfo } from '@/pages/course-page/CoursePage.tsx'

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
  const [isCourseAllowedToPublish, setIsCourseAllowedToPublish] = useState(false)
  const [isSuccessSentModalOpen, setIsSuccessSentModalOpen] = useState(false)

  const fetchCourse = async (): Promise<CourseInfo> => {
    try {
      const response = await axios.get<CourseInfo>(
        `http://localhost:8080/courses/get-full-course/${courseID}`
      )

      return response.data
    } catch (error) {
      console.error('Error fetching categories', error)
    }
    return {} as CourseInfo
  }

  useEffect(() => {
    const fetchData = async () => {
      const course = await fetchCourse()

      if (
        course.status === 'DRAFT' &&
        course.avatar_url &&
        course.instructor.avatar_url &&
        course.lectures_count > 4 &&
        course.lectures_length > 30 &&
        // course.category && // todo: fix category
        course.level &&
        course.subtitle &&
        course.description.length > 100
      ) {
        setIsCourseAllowedToPublish(true)
      } else {
        setIsCourseAllowedToPublish(false)
      }
    }

    fetchData()
  }, [courseID])

  const handleButtonClick = () => {
    if (isCourseAllowedToPublish) {
      setIsSuccessSentModalOpen(true)
      setTimeout(() => {
        axios
          .post(`http://localhost:8080/courses/send-for-approval/${courseID}`)
          .then(() => {
            setIsSuccessSentModalOpen(false)
            navigate('/instructor/courses')
          })
      }, 1000)
    } else {
      setIsModalOpen(true)
      setIsSuccessSentModalOpen(false)
    }
  }

  const handleOutsideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      setIsModalOpen(false)
    }
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
        className={`bg-gray-600 text-white font-semibold p-2 mt-4 w-full py-4 hover:bg-gray-700' ${isCourseAllowedToPublish ? '' : 'opacity-30 cursor-not-allowed'}`}
        onClick={handleButtonClick}
      >
        Отправить на проверку
      </button>

      {isModalOpen && (
        <div
          className='fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50 modal-overlay'
          onClick={handleOutsideClick}
        >
          <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
            <h2 className='text-xl font-semibold mb-4'>
              Почему я не могу отправить на проверку?
            </h2>
            <p>
              Ваш курс практически готов к отправке. Вам нужно выполнить еще несколько
              действий.
            </p>
            <ul className='text-left mt-4 list-disc pl-6'>
              <li>
                На странице{' '}
                <a href='/curriculum' className='text-blue-500'>
                  Учебный план
                </a>{' '}
                вы должны
                <ul className='list-disc pl-6'>
                  <li>Иметь не меньше 30 мин видеоматериалов</li>
                  <li>Иметь не меньше 5 лекций</li>
                </ul>
              </li>
              <li>
                На странице{' '}
                <a href='/basics' className='text-blue-500'>
                  Целевая страница курса
                </a>{' '}
                вы должны
                <ul className='list-disc pl-6'>
                  <li>Have an instructor description with at least 50 words</li>
                  <li>Выбрать категорию курса</li>
                  <li>Выбрать подкатегорию курса</li>
                  <li>Выбрать уровень курса</li>
                  <li>Загрузить изображение курса</li>
                  <li>Загрузить фото преподавателя</li>
                  <li>Иметь подзаголовок курса</li>
                  <li>Создать описание курса объемом не менее 200 сл.</li>
                </ul>
              </li>
              <li>
                На странице{' '}
                <a href='/pricing' className='text-blue-500'>
                  Ценообразование
                </a>{' '}
                вы должны
                <ul className='list-disc pl-6'>
                  <li>Выбрать цену курса</li>
                </ul>
              </li>
            </ul>
            <p className='mt-4'>
              Завершив данные действия, вы сможете отправить ваш курс на проверку.
            </p>
            <p className='mt-2'>
              По-прежнему возникают сложности?{' '}
              <a href='/support' className='text-blue-500'>
                См. страницу поддержки по ссылке
              </a>
              .
            </p>
          </div>
        </div>
      )}

      {isSuccessSentModalOpen && (
        <div className='fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50'>
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
