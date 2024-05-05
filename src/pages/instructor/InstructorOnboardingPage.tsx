import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

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
type step = 1 | 2 | 3
type OnboardingResponses = {
  [key in step]: string
}

const InstructorOnboardingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [isCheckboxSelected, setIsCheckboxSelected] = useState<boolean>(false)
  const [responses, setResponses] = useState<OnboardingResponses>({
    '1': '',
    '2': '',
    '3': '',
  })

  const handleContinue = () => {
    setCurrentStep((prevStep) => prevStep + 1)
    setSelectedOption('')
    setIsCheckboxSelected(false)
  }

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1)
  }

  const handleOptionChange = (option: string) => {
    setResponses(
      (prevResponses) =>
        ({ ...prevResponses, [currentStep]: option }) as OnboardingResponses
    )
    console.log(responses)
    setSelectedOption(option)
    setIsCheckboxSelected(true)
  }

  const isContinueDisabled = !isCheckboxSelected

  return (
    <div className='flex flex-col h-screen'>
      <header className='bg-white text-black p-4 shadow-md relative'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <span className='text-lg font-bold'>ProdigyPath</span>
            <span className='mx-2 h-full absolute top-0 bottom-0 left-36 border-l border-white' />
            <span className={`ml-16`}>Шаг {currentStep} из 3</span>
          </div>
          <NavLink to={'/'}>
            <button className=' mr-4 border-black px-4 py-2 border-2 hover:bg-gray-50'>
              Выйти
            </button>
          </NavLink>
        </div>
      </header>
      <main className='flex-grow flex flex-col items-center '>
        {currentStep === 1 && (
          <PageSection
            title={'Создайте курс'}
            text={
              'Курсы ProdigyPath — это обучение на основе видеоматериалов, которые помогают студентам приобрести практические навыки. Вне зависимости от того, какой опыт преподавания у вас есть, мы поможем вам организовать ваши материалы в виде онлайн-курса, чтобы студентам было интересно и полезно их изучать.'
            }
            checkBoxHeader={'В каком формате вы преподавали раньше?'}
            options={[
              'Лично, частным образом',
              'Лично, профессионально',
              'Онлайн',
              'Другое',
            ]}
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
          />
        )}
        {}
        {currentStep === 2 && (
          <PageSection
            title={'Создайте курс'}
            text={
              'За эти годы мы помогли сотням преподавателей научиться записывать видеоматериалы в домашних условиях. Вне зависимости от уровня вашего опыта мы поможем вам стать настоящим профессионалом видеосъемки и монтажа. У нас есть для вас полезные ресурсы и советы, и мы готовы оказать вам поддержку в любой момент.'
            }
            checkBoxHeader={'Насколько хорошо вы разбираетесь в видеозаписи?'}
            options={[
              'Я новичок',
              'У меня есть определенные знания',
              'У меня большой опыт',
              'У меня уже есть готовые видеоматериалы',
            ]}
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
          />
        )}
        {currentStep === 3 && (
          <PageSection
            title={'Создайте курс'}
            text={
              'Когда ваш курс опубликован, вы можете начать расширять свою аудиторию студентов, использовать возможности продвижения на площадке ProdigyPath и рекламировать свои курсы самостоятельно. Всё вместе это поможет заинтересованным студентам найти ваш курс.'
            }
            checkBoxHeader={'Расширяйте свою аудиторию?'}
            options={[
              'В настоящий момент нет',
              'У меня маленькая аудитория',
              'У меня достаточная аудитория',
            ]}
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
          />
        )}
      </main>
      <footer className='border-t-2 text-white border-black p-4 shadow-md flex justify-between'>
        {currentStep < 3 ? (
          <button
            onClick={handleContinue}
            disabled={isContinueDisabled}
            className={`bg-black px-4 py-2 rounded-md ${
              isCheckboxSelected ? 'hover:bg-gray-600' : 'cursor-not-allowed bg-gray-500'
            }`}
          >
            Продолжить
          </button>
        ) : (
          <button className={'border-black px-4 py-2 border-2 bg-black'}>
            <NavLink to={`/instructor/courses`}>Готово</NavLink>
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
  handleOptionChange: (option: string) => void
}
const PageSection: React.FC<PageSectionProps> = ({
  title,
  checkBoxHeader,
  handleOptionChange,
  options,
  selectedOption,
  text,
}) => {
  return (
    <div className='flex flex-col md:flex-row w-full md:w-auto justify-between ml-12 mt-16 mr-12'>
      <div className='w-full '>
        <SectionTitle title={title} />
        <SectionText text={text} />
        <CheckBoxes
          checkBoxHeader={checkBoxHeader}
          options={options}
          selectedOption={selectedOption}
          onChange={handleOptionChange}
        />
      </div>
      <div className='w-full md:w-2/3 md:ml-4 lg:block hidden '>
        <SectionImage
          src='https://s.udemycdn.com/instructor/onboarding/share.jpg'
          alt='Изображение'
        />
      </div>
    </div>
  )
}
export default InstructorOnboardingPage
