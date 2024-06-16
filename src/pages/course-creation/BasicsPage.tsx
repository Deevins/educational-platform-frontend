import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { ICategory } from '@/pages/course-creation/CourseBaseCreationPage.tsx'

interface IBasicInfo {
  title: string
  subtitle: string
  description: string
  language: string
  level: string
  category_title: string
}

interface ILevel {
  id: number
  name: string
}

const BasicsPage: React.FC = () => {
  const [courseTitle, setCourseTitle] = useState('')
  const [courseSubtitle, setCourseSubtitle] = useState('')
  const [language, setLanguage] = useState('')
  const [level, setLevel] = useState('')
  const [category, setCategory] = useState('')
  const [mainSubject, setMainSubject] = useState('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([])
  const [levels, setLevels] = useState<{ value: string; label: string }[]>([])
  const { courseID } = useParams<{ courseID: string }>()

  const languageOptions = [
    { value: '1', label: 'Русский' },
    { value: '2', label: 'Английский' },
  ]

  useEffect(() => {
    axios
      .get<ICategory[]>('http://localhost:8080/directories/categories')
      .then((response) => {
        const categoryOptions = response.data.map((category) => ({
          value: category.id.toString(),
          label: category.name,
        }))
        console.log(categoryOptions)
        setCategories(categoryOptions)
      })

    axios.get<ILevel[]>('http://localhost:8080/directories/levels').then((response) => {
      const levelOptions = response.data.map((level) => ({
        value: level.id.toString(),
        label: level.name,
      }))
      console.log(levelOptions)
      setLevels(levelOptions)
    })
  }, [])

  useEffect(() => {
    axios
      .get<IBasicInfo>(`http://localhost:8080/courses/get-course-basic-info/${courseID}`)
      .then((response) => {
        setCourseTitle(response.data.title)
        setCourseSubtitle(response.data.subtitle)
        setMainSubject(response.data.description)
        setLanguage(response.data.language)
        setLevel(response.data.level)
        setCategory(response.data.category_title)
        console.log(response.data)
      })
  }, [])

  const uploadFile = async (file: File, type: 'image' | 'video') => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(`http://localhost:8080/upload/${type}`, {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (type === 'image') {
        setImageUrl(data.url)
      } else {
        setVideoUrl(data.url)
      }
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  return (
    <div className='mx-auto max-w-4xl bg-white p-6 rounded-lg shadow-2xl'>
      <h1 className='text-2xl font-bold mb-4'>Целевая страница курса</h1>
      <InputField
        label='Заголовок курса'
        value={courseTitle}
        placeholder='Fullstack разработка ReactJS + Golang'
        onChange={(e) => setCourseTitle(e.target.value)}
      />
      <InputField
        label='Подзаголовок курса'
        value={courseSubtitle}
        placeholder='Введите подзаголовок курса'
        onChange={(e) => setCourseSubtitle(e.target.value)}
      />
      <InputField
        label='Описание курса'
        value={mainSubject}
        placeholder='Введите описание...'
        onChange={(e) => setMainSubject(e.target.value)}
      />
      <div className={'flex justify-between'}>
        <div className={'self-start w-[48%]'}>
          <SelectField
            label='Язык'
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            options={languageOptions}
          />
        </div>
        <div className={'self-end w-[48%]'}>
          <SelectField
            label='Уровень '
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            options={levels}
          />
        </div>
      </div>
      <SelectField
        label='Категория'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={categories}
      />
      <div className={'text-center w-full'}>
        <button className={'bg-black text-gray-100 py-2 px-3'}>Сохранить</button>
      </div>
      <FileUploadField
        url={imageUrl}
        label='Изображение курса'
        description={
          'Размещение проморолика ― это быстрый и эффективный способ для ознакомления студентов с содержанием вашего курса. Студенты, которые рассматривают возможность прохождения вашего курса, с большей вероятностью зарегистрируются на него, если ваше рекламное видео сделано качественно.'
        }
        onChange={(e) => {
          const file = e.target.files ? e.target.files[0] : null
          if (file) {
            uploadFile(file, 'image')
          }
        }}
      />
      <FileUploadField
        url={videoUrl}
        label='Рекламное видео'
        description={
          'Загрузите изображение своего курса здесь. Чтобы загрузка была успешной, оно должно соответствовать стандартам качества изображений курсов. Важные требования: 750×422 пикселей; jpg, jpeg, gif, png, без текста на изображении.'
        }
        onChange={(e) => {
          const file = e.target.files ? e.target.files[0] : null
          if (file) {
            uploadFile(file, 'video')
          }
        }}
      />
      <Profile fullName='Nnnnnnnnnnnnnnnnn' isFilled={false} />
    </div>
  )
}

export default BasicsPage

interface FileUploadFieldProps {
  label: string
  url: string
  description: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  label,
  url,
  onChange,
  description,
}) => {
  return (
    <div className='mb-6 flex items-end '>
      <div className={'pl-[4%]'}>
        <label className='block text-gray-700 text-sm font-bold mb-2'>{label}</label>
        <img
          src={url === '' ? 'https://s.udemycdn.com/course/750x422/placeholder.jpg' : url}
          alt={label}
          className={'w-48 h-48 mr-4 object-cover border-2 border-gray-300'}
        />
      </div>
      <div className={'flex flex-col h-[24vh] justify-end w-[50%] '}>
        <p>{description}</p>
        <input
          type='file'
          onChange={onChange}
          className='mt-6 justify-end text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
        />
      </div>
    </div>
  )
}

interface SelectFieldProps {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: { value: string; label: string }[]
}

const SelectField: React.FC<SelectFieldProps> = ({ label, value, onChange, options }) => (
  <div className='w-full mb-6 '>
    <label className='block text-gray-700 text-sm font-bold mb-2'>{label}</label>
    <select
      value={value}
      onChange={onChange}
      className='border-2 border-b-gray-400 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
)

interface InputFieldProps {
  label: string
  value: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  placeholder,
  onChange,
}) => (
  <div className='mb-6'>
    <label className='block text-gray-700 text-sm font-bold mb-2'>{label}</label>
    <input
      type='text'
      value={value}
      onChange={onChange}
      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      placeholder={placeholder}
    />
  </div>
)

interface ProfileAlertProps {
  fullName: string
  isFilled: boolean
}

const Profile: React.FC<ProfileAlertProps> = ({ fullName, isFilled }) => {
  return (
    <div
      className={`p-4 ${!isFilled ? 'bg-red-100 border-l-4 border-red-500 text-red-700' : 'bg-white'}`}
      role='alert'
    >
      <h3 className='text-lg font-bold text-black'>Профили преподавателя</h3>
      {!isFilled ? (
        <>
          <p>
            Все доступные для просмотра преподаватели этого курса должны заполнить свой
            профиль, чтобы курс был опубликован.
          </p>
          <p>
            Необходимо указать имя, добавить фотографию и кратко рассказать о своем
            профессиональном опыте (минимум 50 слов).
          </p>
        </>
      ) : null}
      <div className='flex items-center mt-4'>
        <div className='flex-shrink-0'>
          <Link to={`/profiles/23/}`}>
            <span className='block bg-gray-400 h-8 w-8 rounded-full overflow-hidden'>
              <span className='text-white text-sm font-medium flex items-center justify-center h-full w-full'>
                N
              </span>
            </span>
          </Link>
          {isFilled ? (
            <span className='ml-2 text-red-500'>
              <i className='fas fa-exclamation-circle'></i>
            </span>
          ) : null}
        </div>
        <div className='ml-3'>
          <Link to={`/users/user/${1}/profile}`}>
            <p className='text-sm leading-5 font-medium text-purple-600 hover:cursor-pointer'>
              {fullName}
            </p>
          </Link>
          {!isFilled ? (
            <>
              <p className='text-sm leading-5 text-gray-500'>Неполная информация</p>
              <p className='text-sm leading-5 text-gray-500'>
                Требуется фото преподавателя.
              </p>
              <Link
                to='/instructor/profile/basic-information/'
                className='text-sm leading-5 underline text-blue-500 hover:text-blue-800'
              >
                Обновите свой профиль
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
