import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import PhoneInput from 'react-phone-input-2'
import useModal from '@/utils/hooks/useModal.ts'
import Pagination from '@/components/Pagination.tsx'
import axios from 'axios'
import useSWR from 'swr'

const ITEMS_PER_PAGE = 6

export interface IUser {
  id: number
  username: string
  email: string
  full_name: string
  avatar_url: string
  phone_number?: string
  description?: string
  courses?: number[]
}

interface UserToUpdate {
  user_id: number
  email: string
  fullName: string
  phone_number?: string
  description?: string
}

interface Course {
  id: number
  title: string
  description: string
}

type MainTab = 'courses'

const courses: Course[] = [
  {
    id: 1,
    title: 'Курс по разработке веб-приложений',
    description: 'Описание курса по разработке веб-приложений',
  },
  {
    id: 2,
    title: 'Курс по разработке мобильных приложений',
    description: 'Курс по разработке мобильных приложений',
  },
  {
    id: 3,
    title: 'Курс по разработке игр',
    description: 'Здесь создают игры на любой вкус',
  },
]

const renderItemsPerPage = (items: IUser[] | Course[], currentPage: number) => {
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, items.length)
  return items.slice(startIndex, endIndex)
}

const CoursesList: React.FC<{ courses: Course[]; user: IUser }> = ({ courses, user }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const paginatedCourses = renderItemsPerPage(courses, currentPage) as Course[]

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div>
      <h3 className='text-xl font-bold mb-4'>
        Курсы, на которые записан {user.full_name}
      </h3>
      {paginatedCourses.length === 0 ? (
        <p className='text-gray-500 text-center'>Список курсов пуст</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {paginatedCourses.map((course) => (
            <div key={course.id} className='bg-white p-4 rounded-lg shadow-md'>
              <h4 className='text-lg font-semibold'>{course.title}</h4>
              <p className='text-gray-600'>{course.description}</p>
              <NavLink
                to={`/courses/course/${course.id}`}
                className='mt-2 inline-block text-blue-500 hover:text-blue-700'
              >
                View Course
              </NavLink>
            </div>
          ))}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={courses.length}
        onClick={handleClick}
      />
    </div>
  )
}

const fetcher = (url: string) => axios.get<IUser>(url).then((res) => res.data)

const UserPage: React.FC = () => {
  const { userID } = useParams<{ userID: string }>()
  const [user, setUser] = useState<IUser | null>(null)
  const [updatedUser, setUpdatedUser] = useState<IUser | null>(null)
  const [currentMainTab, setCurrentMainTab] = useState<MainTab>('courses')
  const [, setPhoneNumber] = useState('')
  const { isOpen, openModal, closeModal, ref } = useModal()
  const [isOnline, setIsOnline] = useState(true)
  const { data, error, isLoading } = useSWR(
    `http://localhost:8080/users/get-one/${userID}`,
    fetcher
  )

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    if (data) {
      setUser(data)
      setUpdatedUser(data)
    }
  }, [isLoading])

  const handleEditClick = () => {
    openModal()
  }

  const handleSave = async () => {
    if (updatedUser) {
      const userToUpdate: UserToUpdate = {
        user_id: updatedUser.id,
        email: updatedUser.email,
        fullName: updatedUser.full_name,
        phone_number: updatedUser.phone_number,
        description: updatedUser.description,
      }
      const res = await axios.put(
        'http://localhost:8080/users/update-user-info',
        userToUpdate
      )
      // Save updated user data (not implemented in this example)
      if (res.status === 200) {
        console.log('User data updated successfully')
        setUser({ ...updatedUser })
      }
    }
    closeModal() // Закрываем модальное окно при сохранении
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (updatedUser) {
      setUpdatedUser({
        ...updatedUser,
        [e.target.name]: e.target.value,
      })
    }
  }

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value)
    if (updatedUser) {
      setUpdatedUser({
        ...updatedUser,
        phone_number: value,
      })
    }
  }

  const handleMainTabChange = (tab: MainTab) => {
    setCurrentMainTab(tab)
  }

  if (error) return <div>ошибка загрузки</div>
  if (isLoading) return <div>загрузка...</div>

  return (
    <>
      <div className='min-h-screen bg-gray-100 shadow-lg rounded-lg overflow-hidden w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12 relative p-8 mt-20 lg:mt-[-150px] xl:mt-10 lg: ml-[20%]'>
        {user ? (
          <>
            <div className='flex items-center mb-4'>
              <div className='relative'>
                <Avatar className={'w-16 h-16 mr-4'}>
                  <AvatarImage src={user.avatar_url} />
                  <AvatarFallback>{user.full_name}</AvatarFallback>
                </Avatar>
                <div
                  className={`absolute bottom-0 right-4 w-4 h-4 rounded-full ${
                    isOnline ? 'bg-green-500' : 'bg-gray-500'
                  } border-2 border-white`}
                />
              </div>
              <div>
                <h2 className='text-2xl font-bold'>{user.full_name}</h2>
                <p className='text-gray-600'>
                  <b>e-mail:</b> {user.email}
                </p>
                <p className='text-gray-600'>
                  <b>телефон: </b>
                  {user.phone_number}
                </p>
              </div>
            </div>
            <hr className='my-4 border-t border-gray-300' />
            {user.id === 1 && (
              <button
                className='bg-blue-500 text-white px-4 py-2 rounded'
                onClick={handleEditClick}
              >
                Редактировать профиль
              </button>
            )}

            <div className='mt-4'>
              <h3 className='text-xl font-bold mb-2'>Обо мне:</h3>
              <p className='text-black mb-4'>{user.description}</p>
            </div>
            <div className='mt-8'>
              <div className='flex justify-between items-center mb-4'>
                <button
                  className={`px-4 py-2 rounded ${
                    currentMainTab === 'courses'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-gray-800'
                  }`}
                  onClick={() => handleMainTabChange('courses')}
                >
                  Курсы
                </button>
              </div>

              {currentMainTab === 'courses' && (
                <CoursesList courses={courses} user={user} />
              )}
            </div>
          </>
        ) : (
          <p className='p-8'>Загрузка...</p>
        )}
      </div>

      {isOpen && (
        <div className='fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center'>
          <div
            ref={ref}
            className='bg-gray-100 p-8 rounded shadow-lg w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12'
          >
            <h2 className='text-2xl font-bold mb-4'>Редактировать профиль</h2>
            <div className='mb-4'>
              <label htmlFor='full_name' className='block text-sm font-medium'>
                ФИО
              </label>
              <input
                type='text'
                id='full_name'
                name='full_name'
                value={updatedUser?.full_name}
                onChange={handleChange}
                placeholder={'Введите ФИО'}
                className='w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 pl-2 lg:text-sm text-black border-black'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-sm font-medium'>
                e-mail
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={updatedUser?.email}
                onChange={handleChange}
                placeholder={'Введите email'}
                className='w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 pl-2 lg:text-sm text-black border-black lg:pl-2 lg:pt-4'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='mobile' className='block text-sm font-medium'>
                Мобильный телефон
              </label>
              <PhoneInput
                country={'ru'}
                value={updatedUser?.phone_number}
                onChange={handlePhoneChange}
                placeholder={'Введите номер мобильного телефона'}
                inputClass='w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 pl-2 lg:text-sm text-black border lg:pl-2 lg:pt-4'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='about' className='block text-sm font-medium'>
                Обо мне
              </label>
              <textarea
                id='description'
                name='description'
                value={updatedUser?.description}
                onChange={handleChange}
                placeholder={'Введите описание'}
                className='w-full h-24  rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm lg:text-sm text-black border-red-300 lg:pl-4 lg:pt-1'
              />
            </div>
            <div className='flex justify-end'>
              <button
                className='bg-blue-500 text-white px-4 py-2 rounded mr-2'
                onClick={handleSave}
              >
                Сохранить
              </button>
              <button
                className='bg-gray-300 text-gray-800 px-4 py-2 rounded'
                onClick={closeModal}
              >
                Отменить
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserPage
