import React from 'react'
import { NavLink } from 'react-router-dom'

// TODO: after button clicked, redirect to /course/create and
//  after 4 steps create course draft on backend and fetch after button 'Create course'
//  clicked redirect to new course create page and info adding(instructor/course/5957360/manage/goals/) 5957360 - course id. this course is set as draft in status
const InstructorCoursesPage: React.FC = () => {
  return (
    <div className='relative flex'>
      {/* Main Content */}
      <div className='flex-1 flex flex-col items-center pl-20 md:pl-30'>
        <div className='shadow-xl border-2 border-gray-100 lg:w-8/12 h-32 flex justify-between items-center mt-20 px-10'>
          <h1 className='text-xl pr-16 lg:pr-32 py-32'>Перейти к созданию курса</h1>
          <button className='hover:bg-blue-600 text-white font-bold lg:px-20 py-4 px-10 bg-black'>
            <NavLink to='/create-course'>Создать курс</NavLink>
            {/* // TODO: check comment on top of page */}
          </button>
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
                <NavLink to={''}>
                  <button className='font-bold py-2 px-4 text-black hover:underline'>
                    Приступите к работе
                  </button>
                </NavLink>
              </div>
            </div>
          </div>

          {/*<div className='bg-gray-200 p-4 my-4'>*/}
          {/*  <p>Текст блока 2</p>*/}
          {/*  <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>*/}
          {/*    Кнопка 2*/}
          {/*  </button>*/}
          {/*</div>*/}

          {/*<div className='bg-gray-200 p-4 my-4'>*/}
          {/*  <p>Текст блока 3</p>*/}
          {/*  <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>*/}
          {/*    Кнопка 3*/}
          {/*  </button>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  )
}

export default InstructorCoursesPage
