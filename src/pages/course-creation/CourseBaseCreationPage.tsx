import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserID } from '@/utils/redux/store/authSlice.ts'
import axios from 'axios'

interface ICreateBase {
  course_id: number
}

export interface ICategory {
  id: number
  name: string
}

// Компонент заголовка
const SectionTitle: React.FC<{ title: string }> = ({ title }) => {
  return <h2 className='text-3xl font-bold mb-10'>{title}</h2>
}

const SectionText: React.FC<{ text: string }> = ({ text }) => {
  return <p>{text}</p>
}

const CheckBoxes: React.FC<{
  options: string[]
  selectedOption: string
  checkBoxHeader: string
  onChange: (option: string) => void
}> = ({ options, selectedOption, checkBoxHeader, onChange }) => {
  return (
    <>
      <h1 className={'font-bold text-lg mb-2 mt-12'}>{checkBoxHeader}</h1>

      <div className='w-full'>
        {options.map((option, index) => (
          <div
            key={index}
            className='border border-black mb-4 hover:bg-gray-300 hover:cursor-pointer'
          >
            <label className='flex items-center p-2 hover:cursor-pointer font-bold'>
              <input
                type='checkbox'
                value={option}
                checked={selectedOption === option}
                onChange={() => onChange(option)}
                className='hidden'
              />
              <div className='border border-black rounded-full w-6 h-6 flex items-center justify-center mr-2'>
                {selectedOption === option && (
                  <span className='bg-black rounded-full w-4 h-4 block' />
                )}
              </div>
              <span className={'pl-2'}>{option}</span>
            </label>
          </div>
        ))}
      </div>
    </>
  )
}

const SectionImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  return <img src={src} alt={alt} className={'hidden lg:block'} />
}

type step = 1 | 2 | 3 | 4
type OnboardingResponses = {
  [key in step]: string
}

const CourseBaseCreationPage: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [isCheckboxSelected, setIsCheckboxSelected] = useState<boolean>(false)
  const [isInputFilled, setIsInputFilled] = useState<boolean>(false)
  const [responses, setResponses] = useState<OnboardingResponses>({
    '1': '',
    '2': '',
    '3': '',
    '4': '',
  })
  const [categories, setCategories] = useState<ICategory[]>([])
  const userID = useSelector(selectUserID)

  useEffect(() => {
    if (selectedOption) {
      setResponses((prevResponses) => ({
        ...prevResponses,
        [currentStep]: selectedOption,
      }))
    }
  }, [selectedOption, currentStep])

  useEffect(() => {
    axios
      .get<ICategory[]>('http://localhost:8080/directories/categories')
      .then((response) => {
        setCategories(response.data)
      })
  }, [])

  const handleContinue = () => {
    if (isContinueDisabled()) {
      return
    }
    setCurrentStep((prevStep) => prevStep + 1)
    setSelectedOption('')
    setIsCheckboxSelected(false)
    setIsInputFilled(false)
  }

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1)
  }

  const handleOptionChange = (option: string) => {
    setSelectedOption(option)
    setIsCheckboxSelected(true)
  }

  const handleInputChange = (value: string) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [currentStep]: value,
    }))
    setIsInputFilled(true)
    setIsCheckboxSelected(true)
  }

  const useCourseCreateHandler = async () => {
    setLoading(true)
    try {
      const response = await axios.post<ICreateBase>(
        'http://localhost:8080/courses/create-base',
        {
          author_id: userID,
          type: responses[1],
          title: responses[2],
          category_title: responses[3],
          time_planned: responses[4],
        }
      )

      if (response.status === 200) {
        navigate(`/instructor/courses/course/${response.data.course_id}/manage/goals`)
      } else {
        // Обработка других кодов ответа
        console.error('Unexpected response:', response)
      }
    } catch (error) {
      // Обработка ошибок запроса
      console.error('Error:', error)
    }

    setLoading(false)
  }

  const isContinueDisabled = (): boolean => {
    if (currentStep === 1 && isCheckboxSelected) {
      return false
    }

    if (currentStep === 2 && isInputFilled) {
      return false
    }

    if (currentStep === 3 && isCheckboxSelected) {
      return false
    }

    if (currentStep === 4 && isCheckboxSelected) {
      return false
    }

    return true
  }

  return (
    <div className='flex flex-col h-screen'>
      <header className='bg-white text-black p-4 shadow-md relative'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <span className='text-lg font-bold'>ProdigyPath</span>
            <span className='mx-2 h-full absolute top-0 bottom-0 left-36 border-l border-white' />
            <span className={`ml-16`}>Шаг {currentStep} из 4</span>
          </div>
          <NavLink to={`/instructor/courses`}>
            <button className=' mr-4 border-black px-4 py-2 border-2 hover:bg-gray-50'>
              Выйти
            </button>
          </NavLink>
        </div>
      </header>
      <main className='flex-grow flex flex-col items-center '>
        {currentStep === 1 && (
          <PageSection
            title={'Сначала давайте определим, курс какого типа вы планируете создать.'}
            text={''}
            checkBoxHeader={'Выберите тип курса:'}
            options={[
              'Курс - который будет включать видеолекции, опросы, тесты, упражнения по написанию кода и другие типы заданий, чтобы процесс обучения был увлекательным и интересным.',
              'Практический тест - помогите студентам подготовиться к экзаменам на получение сертификата; для этого подготовьте для них практические явопросы.',
            ]}
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
            inputPlaceholder={''}
            handleInputChange={handleInputChange}
          />
        )}
        {currentStep === 2 && (
          <PageSection
            title={'У вас уже есть рабочее название курса?'}
            text={
              'Если вы пока не придумали окончательное название своего курса, ничего страшного. Название можно будет потом отредактировать.'
            }
            checkBoxHeader={''}
            options={[]}
            inputPlaceholder={'Введите название курса'}
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
            handleInputChange={handleInputChange}
          />
        )}
        {currentStep === 3 && (
          <Dropdown
            options={categories.map((category) => category.name)}
            selectedOption={selectedOption}
            onChange={handleOptionChange}
            title={'Какая категория лучше всего подходит к теме вашего будущего курса?'}
            desc={
              'Если вы пока не определились с категорией, ничего страшного. Ее можно будет потом отредактировать.'
            }
          />
        )}
        {currentStep === 4 && (
          <PageSection
            title={
              'Сколько времени в неделю вы планируете уделять разработке своего курса?'
            }
            text={
              'На этот вопрос можно дать любой ответ. Мы сможем помочь вам достичь поставленной цели, даже если у вас не очень много свободного времени.'
            }
            checkBoxHeader={'Расширяйте свою аудиторию?'}
            options={[
              'Сейчас я очень занят (0–2 часа)',
              'Я буду уделять этому посильное время (2–4 часов)',
              'У меня достаточно времени (более 5 часов)',
              'Еще не решил(-а), будет ли у меня время',
            ]}
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
            inputPlaceholder={''}
            handleInputChange={handleInputChange}
          />
        )}
      </main>
      <footer className='border-t-2 text-white border-black p-4 shadow-md flex justify-between'>
        {currentStep < 4 ? (
          <button
            onClick={handleContinue}
            disabled={isContinueDisabled()}
            className={`bg-black px-4 py-2 rounded-md ${
              isContinueDisabled()
                ? 'cursor-not-allowed bg-gray-500'
                : 'hover:bg-gray-600'
            }`}
          >
            Продолжить
          </button>
        ) : (
          <button
            className={`border-black px-4 py-2 border-2 bg-black ${loading ? 'cursor-not-allowed bg-gray-500' : 'hover:bg-gray-600'}`}
            disabled={loading}
            onClick={useCourseCreateHandler}
          >
            Создать курс
          </button>
        )}
        {currentStep > 1 && (
          <button
            onClick={handleBack}
            className={'border-black px-4 py-2 border-2 bg-black'}
          >
            Назад
          </button>
        )}
      </footer>
    </div>
  )
}

type PageSectionProps = {
  title: string
  text: string
  checkBoxHeader: string
  options: string[]
  selectedOption: string
  inputPlaceholder?: string
  imageSrc?: string
  handleOptionChange: (option: string) => void
  handleInputChange: (value: string) => void
}

const PageSection: React.FC<PageSectionProps> = ({
  title,
  checkBoxHeader,
  handleOptionChange,
  options,
  selectedOption,
  inputPlaceholder,
  text,
  imageSrc,
  handleInputChange,
}) => {
  return (
    <div className='flex flex-col md:flex-row w-full md:w-auto justify-between ml-12 mt-16 mr-12'>
      <div className='w-full items-center justify-center flex flex-col text-center'>
        <SectionTitle title={title} />
        <SectionText text={text} />
        <CheckBoxes
          checkBoxHeader={checkBoxHeader}
          options={options}
          selectedOption={selectedOption}
          onChange={handleOptionChange}
        />
        {inputPlaceholder && (
          <TextInputSection
            placeholder={inputPlaceholder}
            handleInputChange={handleInputChange as (value: string) => void}
          />
        )}
      </div>
      <div className='w-full md:w-2/3 md:ml-4 lg:block hidden'>
        {imageSrc && <SectionImage src={imageSrc} alt='Изображение' />}
      </div>
    </div>
  )
}

// Компонент для текстового инпута
const TextInputSection: React.FC<{
  placeholder: string
  handleInputChange: (value: string) => void
}> = ({ placeholder, handleInputChange }) => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value

    // Ограничение на 60 символов
    if (newValue.length <= 60) {
      setInputValue(newValue)
      handleInputChange(newValue)
    }
  }

  return (
    <div className={`relative w-full ${placeholder === '' ? 'hidden' : ''}`}>
      <input
        type='text'
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        className='w-full px-4 py-2 border-2 border-black'
      />
      <div className='absolute inset-y-0 right-4 flex items-center text-gray-400'>
        {60 - inputValue.length}
      </div>
    </div>
  )
}

type DropdownProps = {
  title: string
  desc: string
  options: string[]
  selectedOption: string
  onChange: (option: string) => void
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  desc,
  options,
  selectedOption,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionChange = (option: string) => {
    onChange(option)
    toggleDropdown()
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='flex flex-col md:flex-row w-full md:w-auto justify-between ml-12 mt-16 mr-12 '>
      <div className='w-full items-center justify-center flex flex-col text-center '>
        <SectionTitle title={title} />
        <SectionText text={desc} />
        <div className='relative mt-12 w-6/12' ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className='border border-black px-4 py-2  w-full text-left hover:bg-gray-200'
          >
            {selectedOption || 'Выберите опцию'}
          </button>
          {isOpen && (
            <div className='absolute z-10 top-full left-0 mt-1 w-full max-h-96 bg-white border border-black  shadow-md overflow-y-auto'>
              {options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionChange(option)}
                  className='px-4 py-2 cursor-pointer hover:bg-gray-200'
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseBaseCreationPage
