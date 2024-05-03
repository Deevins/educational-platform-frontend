import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

// Компонент заголовка
const SectionTitle: React.FC<{ title: string }> = ({ title }) => {
  return <h2 className='text-lg font-bold'>{title}</h2>
}

const SectionText: React.FC<{ text: string }> = ({ text }) => {
  return <p>{text}</p>
}

const CheckBoxes: React.FC<{
  options: string[]
  selectedOption: string
  onChange: (option: string) => void
}> = ({ options, selectedOption, onChange }) => {
  return (
    <div className='w-full md:w-1/3'>
      {options.map((option, index) => (
        <div
          key={index}
          className='border border-black rounded mb-4 hover:bg-gray-300 hover:cursor-pointer'
        >
          <label className='flex items-center p-2 hover:cursor-pointer'>
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
            <span>{option}</span>
          </label>
        </div>
      ))}
    </div>
  )
}

const SectionImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  return <img src={src} alt={alt} className={'hidden md:block'} />
}

const InstructorOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [isCheckboxSelected, setIsCheckboxSelected] = useState<boolean>(false)

  const handleContinue = () => {
    setCurrentStep((prevStep) => prevStep + 1)
    setSelectedOption('')
    setIsCheckboxSelected(false)
  }

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1)
  }

  const handleOptionChange = (option: string) => {
    setSelectedOption(option)
    setIsCheckboxSelected(true)
  }

  const isContinueDisabled = !isCheckboxSelected

  return (
    <div className='flex flex-col h-screen'>
      {/* Хэдер */}
      <header className='bg-gray-800 text-white p-4 shadow-md'>
        {/* Логотип и текущий шаг */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <span className='text-lg font-bold'>ProdigyPath</span>
            <span className='mx-2'>|</span>
            <span>Шаг {currentStep} из 3</span>
          </div>
          {/* Кнопка Выйти */}
          <button className='hover:underline'>Выйти</button>
        </div>
      </header>
      {/* Основное содержимое страницы */}
      <main className='flex-grow flex flex-col items-center justify-center'>
        {/* Секция 1 */}
        {currentStep === 1 && (
          <div className='flex flex-col md:flex-row w-full md:w-auto justify-between'>
            <div className='w-full md:w-1/3'>
              <SectionTitle title='Заголовок секции 1' />
              <SectionText text='Курсы Udemy — это обучение на основе видеоматериалов, которые помогают студентам приобрести практические навыки. Вне зависимости от того, какой опыт преподавания у вас есть, мы поможем вам организовать ваши материалы в виде онлайн-курса, чтобы студентам было интересно и полезно их изучать.' />
              <CheckBoxes
                options={['Вариант 1', 'Вариант 2', 'Вариант 3', 'Вариант 4']}
                selectedOption={selectedOption}
                onChange={handleOptionChange}
              />
            </div>
            <div className='w-full md:w-2/3 md:ml-4'>
              <SectionImage
                src='https://s.udemycdn.com/instructor/onboarding/share.jpg'
                alt='Изображение'
              />
            </div>
          </div>
        )}
        {/* Другие секции */}
        {/* Добавьте здесь содержимое для остальных секций */}
      </main>
      {/* Футер */}
      <footer className='bg-gray-800 text-white p-4 shadow-md flex justify-between'>
        {/* Кнопка Продолжить или Готово */}
        {currentStep < 3 ? (
          <button
            onClick={handleContinue}
            disabled={isContinueDisabled}
            className={`bg-red-500 px-4 py-2 rounded-md ${
              isCheckboxSelected ? 'hover:bg-red-600' : 'cursor-not-allowed'
            }`}
          >
            Продолжить
          </button>
        ) : (
          <NavLink to='/'>Готово</NavLink>
        )}
        {/* Кнопка Назад */}
        {currentStep > 1 && <button onClick={handleBack}>Назад</button>}
      </footer>
    </div>
  )
}
export default InstructorOnboarding
