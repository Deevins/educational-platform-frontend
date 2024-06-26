import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2' // Предполагается, что у вас есть компонент PhoneInput
import 'react-phone-input-2/lib/style.css'
import Input from '@/components/Input.tsx'
import { useDispatch, useSelector } from 'react-redux'
import {
  registerUserAsync,
  selectIsAuthenticated,
} from '@/utils/redux/store/authSlice.ts'
import { AppDispatch, RootState } from '@/utils/redux/store/store.ts'

interface IRegisterForm {
  fullName: string
  email: string
  phoneNumber: string
  password: string
  repeatPassword: string
}

const RegisterPage: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const isLoading = useSelector((state: RootState) => state.auth.status === 'loading')
  const navigate = useNavigate()
  const [formData, setFormData] = useState<IRegisterForm>({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    repeatPassword: '',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const dispatch = useDispatch<AppDispatch>()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }))
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formErrors: { [key: string]: string } = {}
    if (formData.fullName.trim() === '') {
      formErrors.fullName = 'Введите ФИО'
    }
    if (formData.email.trim() === '') {
      formErrors.email = 'Введите адрес электронной почты'
    }
    if (formData.phoneNumber.trim() === '') {
      formErrors.phoneNumber = 'Введите номер телефона'
    }
    if (formData.password.trim() === '') {
      formErrors.password = 'Введите пароль'
    }
    if (formData.repeatPassword.trim() === '') {
      formErrors.repeatPassword = 'Повторите пароль'
    } else if (formData.password !== formData.repeatPassword) {
      formErrors.repeatPassword = 'Пароли не совпадают'
    }
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      try {
        dispatch(
          registerUserAsync({
            full_name: formData.fullName,
            phone_number: formData.phoneNumber,
            email: formData.email,
            password: formData.password,
          })
        )
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  if (isLoading) return <div>Загрузка...</div>

  return (
    <div className=' flex flex-col'>
      <div className='flex-grow flex flex-col items-center justify-center bg-gray-200'>
        <div className='relative bg-white p-8 sm:p-12 rounded-lg border border-black shadow-lg'>
          <h2 className='text-2xl font-semibold mb-4'>Регистрация</h2>
          <form className='space-y-4 flex-grow w-full max-w-sm' onSubmit={handleSubmit}>
            <Input
              label='ФИО'
              type='text'
              id='text'
              name='fullName'
              onChange={handleChange}
            />
            {errors.fullName && <p className='text-red-500'>{errors.fullName}</p>}
            <Input
              label='E-mail'
              type='email'
              id='email'
              name='email'
              isRequired={true}
              onChange={handleChange}
            />
            {errors.email && <p className='text-red-500'>{errors.email}</p>}
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
                value={formData.phoneNumber}
                onChange={(phone) => setFormData({ ...formData, phoneNumber: phone })}
                inputClass='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
              {errors.phoneNumber && <p className='text-red-500'>{errors.phoneNumber}</p>}
            </div>
            <Input
              label='Пароль'
              type='password'
              id='password'
              name='password'
              isRequired={true}
              onChange={handleChange}
            />
            {errors.password && <p className='text-red-500'>{errors.password}</p>}
            <Input
              label='Повторите пароль'
              type='password'
              id='repeat-password'
              name='repeatPassword'
              isRequired={true}
              onChange={handleChange}
            />
            {errors.repeatPassword && (
              <p className='text-red-500'>{errors.repeatPassword}</p>
            )}

            <button
              type='submit'
              className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600'
            >
              Зарегистрироваться
            </button>
          </form>
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

export default RegisterPage
