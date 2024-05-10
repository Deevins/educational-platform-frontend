import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillInfoCircle } from 'react-icons/ai'

const BasicsPage: React.FC = () => {
  const [courseTitle, setCourseTitle] = useState('')
  const [courseSubtitle, setCourseSubtitle] = useState('')
  // const [courseDescription, setCourseDescription] = useState('');
  const [language, setLanguage] = useState('')
  const [category, setCategory] = useState('')
  const [mainSubject, setMainSubject] = useState('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const [videoUrl, setVideoUrl] = useState<string>('')

  const languageOptions = [
    { value: 'ru', label: 'Русский' },
    { value: 'en', label: 'Английский' },
  ]

  const categoryOptions = [
    { value: '1', label: 'ИТ и ПО' },
    { value: '2', label: 'Дизайн' },
    { value: '3', label: 'Маркетинг' },
  ]
  const subCategoryOptions = [
    { value: '1', label: 'ИТ-сертификация' },
    { value: '2', label: 'ИТ-сертификация' },
    { value: '3', label: 'ИТ-сертификация' },
  ]

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

  // const fetchSuggestions = async (query: string): Promise<string[]> => {
  //   try {
  //     const response = await fetch(`https://your-backend.com/suggestions?query=${query}`)
  //     const data = await response.json()
  //     return data.suggestions
  //   } catch (error) {
  //     console.error('Failed to fetch suggestions:', error)
  //     return []
  //   }
  // }

  // Пример массива с предметами курсов
  const courseSubjects = [
    'Веб-разработка',
    'Разработка под Android',
    'Разработка на iOS',
    'Разработка программного обеспечения',
    'Основы разработки игр',
    'Разработка мобильных приложений',
    'Пейзажная фотография',
    'Портретная фотография',
  ]

  // Моковая функция для поиска
  const fetchSuggestions = async (query: string): Promise<string[]> => {
    return new Promise((resolve) => {
      // Имитируем задержку сетевого запроса
      setTimeout(() => {
        const filteredSubjects = courseSubjects.filter((subject) =>
          subject.toLowerCase().includes(query.toLowerCase())
        )
        resolve(filteredSubjects)
      }, 500)
    })
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
            label='asdas'
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            options={languageOptions}
          />
        </div>
      </div>
      <SelectField
        label='Категория'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={categoryOptions}
      />
      <SelectField
        label='Подкатегория'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={subCategoryOptions}
      />
      <SearchableInput
        label='Каков основной предмет вашего курса?'
        placeholder='например, пейзажная фотография'
        fetchSuggestions={fetchSuggestions}
      />
      <FileUploadField
        url={imageUrl}
        label='Изображение курса'
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
        onChange={(e) => {
          const file = e.target.files ? e.target.files[0] : null
          if (file) {
            uploadFile(file, 'video')
          }
        }}
      />
      <Profile fullName='Nnnnnnnnnnnnnnnnn' isFilled={true} />
    </div>
  )
}

export default BasicsPage

interface FileUploadFieldProps {
  label: string
  url: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({ label, url, onChange }) => {
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
        <p>
          Загрузите изображение своего курса здесь. Чтобы загрузка была успешной, оно
          должно соответствовать стандартам качества изображений курсов. Важные
          требования: 750×422 пикселей; jpg, jpeg, gif, png, без текста на изображении.
        </p>
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

interface SearchableInputProps {
  placeholder: string
  label: string
  fetchSuggestions: (query: string) => Promise<string[]> // Предполагается, что это функция для запроса на сервер
}

const SearchableInput: React.FC<SearchableInputProps> = ({
  placeholder,
  label,
  fetchSuggestions,
}) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showTooltip, setShowTooltip] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setQuery(value)
    if (value.length > 2) {
      const results = await fetchSuggestions(value)
      setSuggestions(results)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  return (
    <div className=''>
      <div className={'flex items-center text-center'}>
        <label className='block text-gray-700 text-lg font-bold mb-2'>{label}</label>
        <AiFillInfoCircle
          className='ml-2 w-6 h-6 pb-1'
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        />
      </div>
      <input
        type='text'
        value={query}
        onChange={handleInputChange}
        className='shadow appearance-none border-2 w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        placeholder={placeholder}
      />
      {showSuggestions && (
        <ul className='absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded shadow-lg max-h-60 overflow-auto'>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
              onClick={() => {
                setQuery(suggestion)
                setShowSuggestions(false)
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {showTooltip && (
        <div className='absolute right-[24%] bottom-[-10%] w-64 p-3 bg-white border border-gray-300 rounded shadow-lg mt-1'>
          Каждая отдельная выбранная тема должна конкретно и точно описывать содержание
          вашего курса, не обобщая излишне. Например для курса "Полный курс по теннису"
          необходимо выбрать тему "Теннис", а не "Подача в теннисе" или "Спорт".{' '}
          <Link to='#' className='text-blue-500'>
            Узнать больше
          </Link>
          .
        </div>
      )}
    </div>
  )
}

interface ProfileAlertProps {
  fullName: string // ФИО пользователя
  isFilled: boolean // Состояние заполнения профиля
}

const Profile: React.FC<ProfileAlertProps> = ({ fullName, isFilled }) => {
  isFilled = !isFilled
  return (
    <div
      className={`p-4 ${isFilled ? 'bg-red-100 border-l-4 border-red-500 text-red-700' : 'bg-white'}`}
      role='alert'
    >
      <h3 className='text-lg font-bold text-black'>Профили преподавателя</h3>
      {isFilled ? (
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
          <Link to={`/profiles/23/}`}>
            <p className='text-sm leading-5 font-medium text-purple-600 hover:cursor-pointer'>
              {fullName}
            </p>
          </Link>
          {isFilled ? (
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
