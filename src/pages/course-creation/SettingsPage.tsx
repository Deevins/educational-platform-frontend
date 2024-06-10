import React, { useState } from 'react'
import { useNotification } from '@/utils/contexts/notificationContext.tsx'

type CourseStatus = 'draft' | 'published'
type CourseRegistrationType = 'public' | 'closed_with_password' | ''

const SettingsPage: React.FC = () => {
  const { showMessage } = useNotification() // Use the notification hook

  const courseID = 1
  const [registrationType, setRegistrationType] = useState<CourseRegistrationType>('')
  const [password, setPassword] = useState('')
  const courseStatus: CourseStatus = 'published'

  const handleRegistrationTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value as CourseRegistrationType
    setRegistrationType(newValue)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  // Custom handler functions that would communicate with the backend
  const handleCancelPublication = async (courseStatus: CourseStatus) => {
    if (courseStatus !== 'published') {
      return
    }
    if (courseStatus !== 'published') {
      showMessage('Publication cannot be cancelled as it is not published.', 'error')
      return
    }

    if (!confirm('Вы уверены, что хотите отменить публикацию?')) {
      return
    }
    try {
      // Replace this with a real API call
      await fetch('/api/cancel-publication', { method: 'POST' })
      showMessage('Курс успешно отменен.', 'success')
    } catch (error) {
      showMessage(
        'Ошибка при отмене публикации. Просмотрите консоль для дополнительной информации',
        'error'
      )
      console.error('Error canceling publication:', error)
    }
  }

  const handleDeleteCourse = async (id: number) => {
    if (!confirm('Вы уверены, что удалить курс?')) {
      return
    }
    try {
      // TODO: add course id to the request body
      // Replace this with a real API call
      console.log(id)
      await fetch('/api/delete-course', { method: 'DELETE' })
      alert('Курс удален.')
    } catch (error) {
      console.error('Error deleting course:', error)
    }
  }

  const handleUpdateRegistration = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOption = event.target.value
    try {
      // Replace this with a real API call
      await fetch('/api/update-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationStatus: selectedOption }),
      })
      alert(`Статус регистрации изменен на: ${selectedOption}`)
    } catch (error) {
      console.error('Error updating registration status:', error)
    }
  }

  const isPasswordRequired = registrationType === 'closed_with_password'

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <div className='bg-white shadow-xl  p-8'>
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
              onClick={() => handleCancelPublication(courseStatus)}
              className={`text-black bg-white hover:bg-gray-200 font-medium px-4 py-1 border-2 border-black w-6/12 ${courseStatus === 'draft' && 'opacity-50 hover:cursor-not-allowed hover:bg-white'}`}
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
              onClick={() => handleDeleteCourse(courseID)}
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
        <div className='mt-8'>
          <h2 className='text-xl font-medium text-gray-700'>
            Регистрация (Конфиденциальность)
          </h2>
          <select
            className='mt-2 border-black border-2 form-select block w-full px-3 py-1 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 hover:cursor-pointer'
            value={registrationType}
            onChange={handleRegistrationTypeChange}
          >
            <option value='public'>Доступно всем</option>
            <option value='closed_with_password'>Закрытый (защищен паролем)</option>
          </select>
          {isPasswordRequired && (
            <div className='mt-4'>
              <input
                type='password'
                className='form-input mt-1 px-2 py-1 border-2 border-black block w-full shadow-sm'
                placeholder='Введите пароль'
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {password.length === 0 && (
                <p className='mt-2 text-sm text-red-600'>
                  Поле пароля не может быть пустым
                </p>
              )}
            </div>
          )}
          <button
            className={`mt-6 px-5 py-2 rounded transition duration-300 ${isPasswordRequired && password.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
            disabled={isPasswordRequired && password.length === 0}
            onClick={handleUpdateRegistration}
          >
            Сохранить
          </button>
          <p className='mt-1 text-sm text-gray-600'>
            Открытые курсы отображаются в результатах поиска и доступны для всех на
            платформе ProdigyPath.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
