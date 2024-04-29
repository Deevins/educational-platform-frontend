import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const RegistrationPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('')

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Ваш код для обработки отправки формы
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-grow flex flex-col items-center justify-center bg-gray-200'>
        {/* Фон */}
        <div className='absolute inset-0 bg-gray-200'></div>

        {/* Блок с формой */}
        <div className='relative bg-white p-8 sm:p-12 rounded-lg border border-black shadow-lg'>
          <h2 className='text-2xl font-semibold mb-4'>Регистрация</h2>

          {/* Форма */}
          <form className='space-y-4 flex-grow w-full max-w-sm' onSubmit={handleSubmit}>
            {/* Поле для ввода фио */}
            <InputField label='ФИО' type='text' id='text' />

            {/* Поле для ввода e-mail */}
            <InputField label='E-mail' type='email' id='email' isRequired={true} />

            {/* Поле для ввода телефона */}
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='phone'
              >
                Телефон
              </label>
              <PhoneInput
                country='ru'
                placeholder='+7 (XXX) XXX-XX-XX'
                value={phoneNumber}
                onChange={handlePhoneChange}
                inputClass='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>

            {/* Поле для ввода пароля */}
            <InputField label='Пароль' type='password' id='password' isRequired={true} />
            {/* Поле для повторного ввода пароля */}
            <InputField
              label='Повторите пароль'
              type='password'
              id='repeat-password'
              isRequired={true}
            />

            {/* Кнопка регистрации */}
            <button
              type='submit'
              className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600'
            >
              Зарегистрироваться
            </button>
          </form>

          {/* Ссылка для входа */}
          <div className='mt-4 text-center'>
            <p>
              Уже есть аккаунт?
              <NavLink to='/auth/login' className='text-blue-500 hover:underline pl-1'>
                Войти
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default RegistrationPage

interface InputFieldProps {
  label: string
  type: string
  id: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  isRequired?: boolean
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  id,
  value,
  onChange,
  className,
  isRequired = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className='block mb-1'>
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={'w-full border rounded-lg py-2 px-4 ' + className}
        value={value}
        onChange={onChange}
        required={isRequired}
      />
    </div>
  )
}
