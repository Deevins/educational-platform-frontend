import React, { useEffect, useState } from 'react'
import { useNotification } from '@/utils/contexts/notificationContext.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { CourseInfo } from '@/pages/course-page/CoursePage.tsx'

const SettingsPage: React.FC = () => {
  const { showMessage } = useNotification() // Use the notification hook
  const courseID = useParams<{ courseID: string }>().courseID
  const [course, setCourse] = useState<CourseInfo | null>(null)
  const [isDone, setIsDone] = useState(false)
  const navigate = useNavigate()

  const handleCancelPublication = async (courseStatus: string) => {
    if (courseStatus !== 'READY') {
      return
    }

    if (!confirm('Вы уверены, что хотите отменить публикацию?')) {
      return
    }

    try {
      await axios.post(`http://localhost:8080/courses/cancel-publishing/${courseID}`)
      showMessage('Курс успешно отменен.', 'success')
      setIsDone((prev) => !prev)
      navigate('/instructor/courses')
    } catch (error) {
      showMessage(
        'Ошибка при отмене публикации. Просмотрите консоль для дополнительной информации',
        'error'
      )
      console.error('Error canceling publication:', error)
    }
  }

  const handleDeleteCourse = async () => {
    if (!confirm('Вы уверены, что удалить курс?')) {
      return
    }
    try {
      await axios.delete(`http://localhost:8080/courses/delete/${courseID}`)

      alert('Курс удален.')
      navigate('/instructor/courses')
    } catch (error) {
      console.error('Error deleting course:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get<CourseInfo>(
        `http://localhost:8080/courses/get-full-course/${courseID}`
      )

      setCourse(res.data)
    }

    fetchData()
  }, [courseID, isDone])

  if (!courseID) {
    return <div>Курс не найден</div>
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <div className='bg-white shadow-xl p-8'>
        <div className='border-b pb-4'>
          <h1 className='text-2xl font-semibold text-gray-800'>Настройки курса</h1>
        </div>
        <div className='bg-white p-4 shadow '>
          <h2 className='text-lg font-semibold'>Статус курса</h2>
          <p className='text-sm text-gray-600 mt-2'>
            Этот курс не опубликован на площадке курсов ProdigyPath.
          </p>
          <div className='mt-3'>
            <button
              onClick={() => handleCancelPublication(course?.status || '')}
              disabled={course?.status !== 'READY'}
              className={`text-black bg-white hover:bg-gray-200 font-medium px-4 py-1 border-2 border-black w-6/12 ${course?.status !== 'READY' && 'opacity-50 hover:cursor-not-allowed hover:bg-white'}`}
            >
              Отменить публикацию
            </button>
            <p className='text-sm text-gray-600 mt-2'>
              Новые студенты не могут найти ваш курс на веб-сайте, однако уже
              зарегистрированные на него студенты сохранят доступ к материалам.
            </p>
          </div>
          <div className='mt-4 '>
            <button
              onClick={() => handleDeleteCourse()}
              className='text-gray-700 bg-white border-2 border-black hover:bg-gray-200 font-medium rounded px-4 py-1 w-6/12'
            >
              Удалить
            </button>
            <p className='text-sm text-gray-600 mt-2'>
              Мы предоставляем студентам пожизненный доступ, поэтому удалить курс будет
              невозможно, если на него зарегистрировались.
            </p>
          </div>
        </div>
        {/*<div className='mt-8'>*/}
        {/*  <h2 className='text-xl font-medium text-gray-700'>*/}
        {/*    Регистрация (Конфиденциальность)*/}
        {/*  </h2>*/}
        {/*  <select*/}
        {/*    className='mt-2 border-black border-2 form-select block w-full px-3 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 hover:cursor-pointer'*/}
        {/*    value={registrationType}*/}
        {/*    onChange={handleRegistrationTypeChange}*/}
        {/*  >*/}
        {/*    <option value='public'>Доступно всем</option>*/}
        {/*    <option value='closed_with_password'>Закрытый (защищен паролем)</option>*/}
        {/*  </select>*/}
        {/*  {isPasswordRequired && (*/}
        {/*    <div className='mt-4'>*/}
        {/*      <input*/}
        {/*        type='password'*/}
        {/*        className='form-input mt-1 px-2 py-1 border-2 border-black block w-full shadow-sm'*/}
        {/*        placeholder='Введите пароль'*/}
        {/*        value={password}*/}
        {/*        onChange={handlePasswordChange}*/}
        {/*        required*/}
        {/*      />*/}
        {/*      {password.length === 0 && (*/}
        {/*        <p className='mt-2 text-sm text-red-600'>*/}
        {/*          Поле пароля не может быть пустым*/}
        {/*        </p>*/}
        {/*      )}*/}
        {/*    </div>*/}
        {/*  )}*/}
        {/*  <button*/}
        {/*    className={`mt-6 px-5 py-2 rounded transition duration-300 ${isPasswordRequired && password.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}*/}
        {/*    disabled={isPasswordRequired && password.length === 0}*/}
        {/*    onClick={handleUpdateRegistration}*/}
        {/*  >*/}
        {/*    Сохранить*/}
        {/*  </button>*/}
        {/*  <p className='mt-1 text-sm text-gray-600'>*/}
        {/*    Открытые курсы отображаются в результатах поиска и доступны для всех на*/}
        {/*    платформе ProdigyPath.*/}
        {/*  </p>*/}
        {/*</div>*/}
      </div>
    </div>
  )
}

export default SettingsPage
