import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import useSWR from 'swr'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectUserID } from '@/utils/redux/store/authSlice.ts'

type AuthorCourse = {
  id: number
  title: string
  avatar_url: string
  status: string
}
const fetcher = (url: string) => axios.get<AuthorCourse[]>(url).then((res) => res.data)

const InstructorCoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('date') // Default sorting by date
  const userID = useSelector(selectUserID)
  const { data, error, isLoading } = useSWR(
    `http://localhost:8080/courses/get-all-courses-by-instructor-id/${userID}`,
    fetcher
  )
  // Обработчик для изменения значения поиска
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value)
  }

  // Обработчик для изменения опции сортировки
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSortBy(event.target.value)
    setSearchTerm('')
  }

  // Пример тестовых данных для курсов
  // const courses = [
  //   {
  //     id: 1,
  //     title: 'Разработка фуллстек приложений на React и Node.js',
  //     imageSrc: 'https://s.udemycdn.com/course/200_H/placeholder.jpg',
  //     isDraft: true,
  //     isPublic: false,
  //     progress: 30,
  //   },
  //   {
  //     id: 2,
  //     title: 'Основы k8s и его практическое применение',
  //     imageSrc: 'https://s.udemycdn.com/course/200_H/placeholder.jpg',
  //     isDraft: false,
  //     isPublic: true,
  //     progress: 70,
  //   },
  // ]

  if (error) return <div>ошибка загрузки</div>
  if (isLoading) return <div>загрузка...</div>
  return (
    <div className='relative flex'>
      {/* Main Content */}
      <div className='flex-1 flex flex-col items-center pl-20 md:pl-30'>
        {data?.length === 0 ? (
          <div className='shadow-xl border-2 border-gray-100 lg:w-8/12 h-32 flex justify-between items-center mt-20 px-10'>
            <h1 className='text-xl pr-16 lg:pr-32 py-32'>Перейти к созданию курса</h1>
            <button className='hover:bg-gray-700 text-white font-bold lg:px-20 py-4 px-10 bg-black'>
              <NavLink to='/instructor/course/create'>Создать курс</NavLink>
              {/* // TODO: check comment on top of page */}
            </button>
          </div>
        ) : (
          <div className='w-full border-gray-200 p-4 flex justify-between mt-20 lg:w-8/12'>
            <div className='flex items-center'>
              {/* Поиск */}
              <input
                type='text'
                placeholder='Поиск'
                className='border border-black  px-3 py-1 mr-4'
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {/* Выпадающий список для сортировки */}
              <select
                className='border border-gray-300 px-3 py-1'
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value='date'>Дата</option>
                <option value='name'>Название</option>
                {/* Добавьте другие варианты сортировки, если нужно */}
              </select>
            </div>
            {/* Кнопка для создания нового курса */}
            <NavLink to='/instructor/course/create'>
              <button className='hover:bg-gray-700 text-white font-bold px-4 py-2 bg-black'>
                Новый курс
              </button>
            </NavLink>
          </div>
        )}
        <div className='relative flex flex-col items-center lg:w-9/12 md:5/12'>
          <div className='flex-1 flex flex-col items-center lg:w-full lg:mr-32'>
            {/* Отображение карточек курсов */}
            {data?.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                imageSrc={course.avatar_url}
                isDraft={course.status === 'draft'}
                isPublic={course.status === 'public'}
              />
            ))}
          </div>
        </div>
        <div className='my-10'>
          <p className='text-center'>
            Исходя из вашего опыта, предлагаем вам ознакомиться со следующими ресурсами.
          </p>
        </div>

        <div className='flex flex-col items-center'>
          <div className={'flex justify-center w-[92%] ml-28 lg:ml-0'}>
            <div className='shadow-xl border-2 border-gray-100 pt-4 pl-4 pb-4 pr-2 my-4 mr-32 relative flex flex-col  w-[80%]'>
              <div className='flex flex-col lg:flex-row justify-center'>
                <div className='flex-shrink-0 lg:order-1 pr-8'>
                  <img
                    src='https://s.udemycdn.com/instructor/dashboard/build-audience.jpg'
                    alt='asd'
                    className='hidden lg:block h-[80%] float-right'
                  />
                </div>
                <div className='ml-4 w-[50%]'>
                  <h1 className='text-center mb-4 font-medium'>
                    Создайте привлекательный курс
                  </h1>
                  <p>
                    Вне зависимости от вашего опыта в преподавании вы можете сделать свой
                    курс увлекательным. Мы подготовили подборку ресурсов и передовых
                    методик, которые помогут вам достичь новых высот и выйти на новый
                    уровень.
                  </p>
                </div>
              </div>
              <div className='flex justify-center mt-auto'>
                <NavLink to={'/instructor/resources/teaching'}>
                  <button className='font-bold py-2 px-4 text-black hover:underline'>
                    Приступите к работе
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
          <div className={'flex justify-center ml-32 lg:ml-0'}>
            <div className='shadow-xl border-2 border-gray-100 pt-4 pl-4 pb-4 pr-2 my-4 mr-32 w-1/3 relative'>
              <div className='flex flex-col lg:flex-row'>
                <div className='flex-shrink-0 lg:order-1 pr-8'>
                  <img
                    src='https://s.udemycdn.com/instructor/dashboard/engaging-course.jpg'
                    alt='asd'
                    className='hidden lg:block h-[80%] float-right'
                  />
                </div>
                <div className='ml-4 flex-grow'>
                  <h1 className='text-center mb-4 font-medium'>
                    Создайте привлекательный курс
                  </h1>
                  <p>
                    Вне зависимости от вашего опыта в преподавании вы можете сделать свой
                    курс увлекательным. Мы подготовили подборку ресурсов и передовых
                    методик, которые помогут вам достичь новых высот и выйти на новый
                    уровень.
                  </p>
                </div>
              </div>
              <div className='flex justify-center'>
                <NavLink to={'/instructor/resources/teaching'}>
                  <button className=' font-bold py-2 px-4 text-black hover:underline'>
                    Приступите к работе
                  </button>
                </NavLink>
              </div>
            </div>

            <div className='shadow-xl border-2 border-gray-100 pt-4 pl-4 pb-4 pr-2 my-4 mr-32 w-1/3 relative flex flex-col'>
              <div className='flex flex-col lg:flex-row'>
                <div className='flex-shrink-0 lg:order-1 pr-8'>
                  <img
                    src='https://s.udemycdn.com/instructor/dashboard/build-audience.jpg'
                    alt='asd'
                    className='hidden lg:block h-[80%] float-right'
                  />
                </div>
                <div className='ml-4 flex-grow'>
                  <h1 className='text-center mb-4 font-medium'>
                    Собирайте собственную аудиторию
                  </h1>
                  <p>Сделайте свой курс успешным, формируя собственную аудиторию.</p>
                </div>
              </div>
              <div className='flex justify-center mt-auto'>
                <NavLink to={'/teaching/onboarding/teaching-experience'}>
                  <button className='font-bold py-2 px-4 text-black hover:underline'>
                    Приступите к работе
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
          <div className={'flex justify-center w-[92%] ml-28 lg:ml-0'}>
            <div className='shadow-xl border-2 border-gray-100 pt-4 pl-4 pb-4 pr-2 my-4 mr-32 relative flex flex-col  w-[80%]'>
              <div className='flex flex-col lg:flex-row justify-center'>
                <div className='flex-shrink-0 lg:order-1 pr-8'>
                  <img
                    src='https://s.udemycdn.com/instructor/dashboard/newcomer-challenge.jpg'
                    alt='asd'
                    className='hidden lg:block h-[80%] float-right'
                  />
                </div>
                <div className='ml-4 w-[50%]'>
                  <h1 className='text-center mb-4 font-medium'>
                    Создайте привлекательный курс
                  </h1>
                  <p>
                    Вне зависимости от вашего опыта в преподавании вы можете сделать свой
                    курс увлекательным. Мы подготовили подборку ресурсов и передовых
                    методик, которые помогут вам достичь новых высот и выйти на новый
                    уровень.
                  </p>
                </div>
              </div>
              <div className='flex justify-center mt-auto'>
                <button className='font-bold py-2 px-4 text-black hover:underline'>
                  <NavLink to={'/instructor/newcomer'}>Приступите к работе</NavLink>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstructorCoursesPage

interface CourseCardProps {
  id: number
  imageSrc: string
  title: string
  isDraft: boolean
  isPublic: boolean
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  imageSrc,
  title,
  isDraft,
  isPublic,
}) => {
  return (
    <div className='shadow-xl border-2 border-gray-100 flex flex-row items-stretch w-[100vh] lg:w-[100vh] md:w-[100vh] 2xl:w-full my-4 relative group h-40'>
      <NavLink
        to={`/instructor/courses/course/${id}/manage/goals`}
        className='w-full h-full absolute inset-0 z-10 opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity flex items-center justify-center'
      >
        <span className='text-white font-bold text-center'>
          Изменить / Дополнить курс
        </span>
      </NavLink>
      <img
        src={imageSrc}
        alt={title}
        className='object-contain h-full lg:w-1/3 flex-none'
      />
      <div className='flex-grow flex flex-col justify-between p-4 lg:w-2/3'>
        <div>
          <h1 className='text-center mb-4 font-medium'>{title}</h1>
          <div className='mb-4'>
            <p>{isDraft ? 'Черновик' : 'Публичный'}</p>
            <p>{isPublic ? 'Доступен всем' : 'Не доступен всем'}</p>
          </div>
        </div>
        {/*<div className='w-full bg-gray-200 rounded-full mb-4'>*/}
        {/*  <div*/}
        {/*    className='h-2 bg-fuchsia-500 rounded-full'*/}
        {/*    style={{ width: `${progress}%` }}*/}
        {/*  ></div>*/}
        {/*</div>*/}
      </div>
    </div>
  )
}
