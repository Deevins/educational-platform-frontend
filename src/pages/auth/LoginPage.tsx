import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Input from '@/components/Input.tsx'

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }))
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Проверка данных формы на ошибки
    const formErrors: { [key: string]: string } = {}
    if (formData.email.trim() === '') {
      formErrors.email = 'Введите адрес электронной почты'
    }
    if (formData.password.trim() === '') {
      formErrors.password = 'Введите пароль'
    }
    // Устанавливаем ошибки в состояние
    setErrors(formErrors)

    // Если нет ошибок, отправляем данные
    if (Object.keys(formErrors).length === 0) {
      // Здесь можно отправить данные формы
      console.log('Форма отправлена:', formData)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl mb-4 font-bold'>Вход</h2>
        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <Input
              className={errors.email ? 'border-red-500' : ''}
              label='E-mail'
              type='email'
              id='email'
              name='email'
              isRequired={true}
              onChange={handleChange}
            />
            {errors.email && <p className='text-red-500'>{errors.email}</p>}
          </div>
          <div className='mb-6'>
            <Input
              className={errors.password ? 'border-red-500' : ''}
              id='password'
              type='password'
              name={'password'}
              label={'Введите ваш пароль'}
              onChange={handleChange}
            />
            {errors.password && <p className='text-red-500'>{errors.password}</p>}
          </div>
          <div>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 w-full focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Войти
            </button>
            <div className='mt-4 text-center'>
              <p>
                Впервые здесь?
                <NavLink
                  to='/auth/register'
                  className='text-blue-500 hover:underline pl-1'
                >
                  Зарегистрироваться
                </NavLink>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default LoginPage
