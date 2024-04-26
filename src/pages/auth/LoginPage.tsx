import React from 'react'
import { NavLink } from 'react-router-dom'

const LoginPage: React.FC = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl mb-4'>Вход</h2>
        <form>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
              Email
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='email'
              placeholder='Введите ваш email'
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'
            >
              Пароль
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              placeholder='Введите ваш пароль'
            />
          </div>
          <div>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 w-full focus:outline-none focus:shadow-outline'
              type='button'
            >
              Войти
            </button>
            {/* Ссылка для входа */}
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
