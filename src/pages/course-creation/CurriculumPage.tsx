import { Link } from 'react-router-dom'
import { IoIosArrowDown, IoMdAdd, IoMdClose } from 'react-icons/io'
import React, { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im'
import { FaCheckCircle, FaPlus, FaTrash } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'

// Types for lection

// type SectionLectionFillType = string

// type SectionLectionFillType = 'video' | 'text' | 'code'
//
//
// type SectionLection = {
//   title: string
//   fill: string
// }

// Types for test

// Types for lection

// type SectionTest = {
//   title: string
// }
// type SectionAssignment = {
//   title: string
// }
// type Section = {
//   title: string
//   description: string
//   lections: SectionLection[]
//   tests: SectionTest[]
//   assignments: SectionAssignment[]
// }
// type SectionComponents = SectionAssignment | SectionLection | SectionTest

// interface Course {
//   title: string
//   description: string
//   sections: Section[]
// }
//
// interface Section {
//   title: string
//   lectures: Lecture[]
// }

const CurriculumPage = () => {
  const [isSectionCreationActive, setIsSectionCreationActive] = React.useState(false)
  return (
    <div className='mx-auto max-w-4xl bg-white p-6 rounded-lg shadow-2xl w-full'>
      <h1 className='text-2xl font-bold mb-4'>Учебный план</h1>
      <hr className='border-t border-gray-400 mb-8 w-full opacity-75' />
      <p>
        Начните составлять свой курс, создав разделы, лекции и практические задания
        (тесты, упражнения по написанию кода, задания).
      </p>
      <p>
        Начните составлять свой курс, создав разделы, лекции и практические задания тесты,
        упражнения по написанию кода и задания{'  '}
        <Link
          to={'/course-creation/plan-your-practice-activities/'}
          className={'text-blue-700 underline pb-4'}
        >
          (тесты, упражнения по написанию кода и задания).
        </Link>
        Используйте{' '}
        <Link
          to={'/course-creation/outline-your-course/'}
          className={'text-blue-700 underline pb-4'}
        >
          план курса
        </Link>{' '}
        для выстраивания структуры материалов и понятной маркировки разделов и лекций.
      </p>
      <Section />

      <div
        className={
          'transition border-black duration-500 w-[100%] h-12 items-center flex rounded-sm mt-8'
        }
      >
        {isSectionCreationActive ? (
          <button
            className={`w-12 h-8 bg-gray-100 hover:cursor-pointer flex justify-center items-center visible ml-4 hover:bg-gray-200`}
            onClick={() => setIsSectionCreationActive(false)}
          >
            <ImCross className={'rotate-180 opacity-60 scale-50'} />
          </button>
        ) : (
          <button
            className={`w-12 h-8 rounded border-dotted ml-4 bg-gray-100
           border-2 border-green hover:cursor-pointer hover:bg-gray-200 flex justify-center items-center visible `}
            onClick={() => setIsSectionCreationActive(true)}
          >
            <IoMdAdd />
          </button>
        )}
      </div>

      {isSectionCreationActive && (
        <NewSectionBlock
          onSave={(title: string, description: string) => {
            console.log(title, description)
            setIsSectionCreationActive(false)
          }}
          onCancel={() => setIsSectionCreationActive(false)}
        />
      )}
    </div>
  )
}

interface NewSectionModalProps {
  onSave: (title: string, description: string) => void
  onCancel: () => void
}

const NewSectionBlock: React.FC<NewSectionModalProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  return (
    <div className='flex items-center justify-center text-black mt-12'>
      <div className='p-6 w-full max-w-xl border-2 border-black shadow-lg'>
        <h2 className='text-xl font-bold mb-4'>Новый раздел:</h2>
        <div className='mb-3'>
          <input
            type='text'
            placeholder='Введите название'
            className='border border-gray-300 p-2 w-full'
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 80))}
            maxLength={80}
          />
          <div className='text-right text-sm text-gray-500'>
            {80 - title.length} символов осталось
          </div>
        </div>
        <div className='mb-6'>
          <h2 className={'font-bold mb-2'}>
            Что студенты смогут делать в конце этого раздела?
          </h2>
          <textarea
            placeholder='Научиться писать код на Typescript, научиться работать с React, научиться работать с базами данных и т.д.'
            className='border border-gray-300 p-2 w-full'
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 200))}
            maxLength={200}
          />
          <div className='text-right text-sm text-gray-500'>
            {200 - description.length} символов осталось
          </div>
        </div>
        <div className='flex justify-end space-x-2'>
          <button
            className='hover:bg-gray-200 font-bold py-2 px-4 rounded'
            onClick={onCancel}
          >
            Отменить
          </button>
          <button
            className='bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded'
            onClick={() => onSave(title, description)}
          >
            Добавить раздел
          </button>
        </div>
      </div>
    </div>
  )
}

export default CurriculumPage

const Section = () => {
  const [isTitleButtonsShown, setIsTitleButtonsShown] = React.useState(false)
  const [isComponentAdditionActive, setIsComponentAdditionActive] = React.useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [lecture, setLecture] = useState({ title: '', description: '' })
  console.log(lecture)
  const handleAddComponent = () => {
    setIsComponentAdditionActive(!isComponentAdditionActive)
  }

  const handleAddLecture = (title: string, description: string) => {
    setLecture({ title, description })
    setIsModalOpen(false)
    console.log('Lecture added:', title, description)
  }

  return (
    // захуярить модалку на все изменения. похуй на приколы юдемича
    <div className={'border-2 border-black mt-16 min-h-8 bg-gray-100 py-4 px-2 '}>
      <div
        className={'flex mb-8 w-full'}
        onMouseEnter={() => setIsTitleButtonsShown(true)}
        onMouseLeave={() => setIsTitleButtonsShown(false)}
      >
        <h1 className={'font-bold mr-2'}>Часть 1:</h1>
        <p>Введение</p>
        <span
          className={`flex scale-90 items-center ml-2 ${isTitleButtonsShown ? 'visible' : 'hidden'} `}
        >
          <MdModeEdit className={'mr-4 hover:cursor-pointer'} />
          <FaTrash className={'mr-4 hover:cursor-pointer'} />
        </span>
      </div>
      <SectionComponent sectionType={'lection'} />
      <SectionComponent sectionType={'test'} />
      <SectionComponent sectionType={'lection'} />
      {isComponentAdditionActive ? (
        <div>
          <button className={'pl-8'} onClick={handleAddComponent}>
            <IoMdClose />
          </button>
          <div className='bg-white border-black border-dotted border-2 flex items-center min-h-12 ml-16 py-1.5 mb-6 self-end'>
            <div className={'flex ml-4'}>
              <button
                className={
                  'flex items-center ml-2 text-indigo-400 hover:text-indigo-800 mr-4'
                }
                onClick={() => setIsModalOpen(true)}
              >
                <FaPlus className={'mr-1'} />
                <span className={'font-semibold'}>Лекция</span>
              </button>
              <button
                className={
                  'flex items-center ml-2 text-indigo-400 hover:text-indigo-800 mr-4'
                }
              >
                <FaPlus className={'mr-1'} />
                <span className={'font-semibold'}>Тест</span>
              </button>
              <button
                className={
                  'flex items-center ml-2 text-indigo-400 hover:text-indigo-800 mr-4'
                }
              >
                <FaPlus className={'mr-1'} />
                <span className={'font-semibold'}>Задание</span>
              </button>
            </div>
            {isModalOpen && (
              <Modal
                title=''
                description=''
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddLecture={handleAddLecture}
              />
            )}
          </div>
        </div>
      ) : (
        <button
          className={
            'bg-white border-[1px] border-black flex items-center ml-16 mt-6 py-1 px-4 hover:bg-gray-300 w-6/12'
          }
          onClick={handleAddComponent}
        >
          <span className={'font-bold flex justify-center items-center'}>
            <FaPlus className={'mr-2'} />
            <span className={'mb-1'}>компонент учебной программы</span>
          </span>
        </button>
      )}
    </div>
  )
}

type SectionComponentType = 'lection' | 'test' | 'assignment'

interface SectionComponentProps {
  sectionType: SectionComponentType
}

const SectionComponent: React.FC<SectionComponentProps> = ({ sectionType }) => {
  // switch over types of component - lection, test, assignment

  switch (sectionType) {
    case 'lection':
      return <LectionComponent />
    case 'test':
      return <TestComponent />
    case 'assignment':
      return <AssignmentComponent />
  }
}

const LectionComponent = () => {
  return (
    <div className='bg-white border-black border-2 flex items-center justify-between min-h-12 ml-16 py-1.5 mb-6 self-end'>
      <div className='flex items-center'>
        <FaCheckCircle className='ml-2 mr-1' />
        <p className='mr-2'>Лекция 1:</p>
        <p>Описание</p>
      </div>
      <div className={'flex items-center justify-center hover:cursor-pointer'}>
        <button className='flex items-center border-black border-[1px] px-2 py-0.5 font-medium hover:bg-gray-300 '>
          <IoMdAdd />
          <p className='pb-0.5'>содержимое</p>
        </button>
        <IoIosArrowDown className={'ml-4 mr-4'} />
      </div>
    </div>
  )
}

type TestData = {
  title: string
  description: string
  questions: TestQuestion[]
}

type TestQuestion = {
  question: string
  answers: TestAnswer[]
}

type TestAnswer = {
  answer: string
  answerIsCorrect: boolean
  answerDescription: string
}
const testData: TestData[] = [
  {
    title: 'Тест 1',
    description: 'Тест по теме "Введение"',
    questions: [
      {
        question: 'Вопрос 1',
        answers: [
          {
            answer: 'Ответ 1',
            answerDescription: 'Описание ответа 1',
            answerIsCorrect: true,
          },
        ],
      },
    ],
  },
]

const TestComponent: React.FC = () => {
  const [editButtonsVisible, setIsEditButtonsVisible] = React.useState(false)
  // here will be request to fetch component data
  React.useEffect(() => {
    console.log('TestComponent mounted')
    return () => {
      console.log('TestComponent unmounted')
    }
  }, [])

  return testData.map((test, index) => (
    <div
      key={index}
      className='bg-white border-black border-2 flex items-center justify-between min-h-12 ml-16 py-1.5 mb-6 self-end'
      onMouseEnter={() => setIsEditButtonsVisible(true)}
      onMouseLeave={() => setIsEditButtonsVisible(false)}
    >
      <div className='flex items-center'>
        <FaCheckCircle className='ml-2 mr-1' />
        <p className='mr-2'>{test.title}:</p>
        <p>{test.description}</p>
        <span
          className={`flex scale-90 items-center ml-2 ${editButtonsVisible ? 'visible' : 'hidden'} `}
        >
          <MdModeEdit className={'mr-4 hover:cursor-pointer'} />
          <FaTrash className={'mr-4 hover:cursor-pointer'} />
        </span>
      </div>
      <div className={'flex items-center justify-center hover:cursor-pointer'}>
        <button className='flex items-center border-black border-[1px] px-2 py-0.5 font-medium hover:bg-gray-300 '>
          <IoMdAdd />
          <p className='pb-0.5'>содержимое</p>
        </button>
        <IoIosArrowDown className={'ml-4 mr-4'} />
      </div>
    </div>
  ))
}
// TODO: implement AssignmentComponent if have time( im dying)
const AssignmentComponent: React.FC = () => {
  return (
    <div className='bg-white border-black border-2 flex items-center justify-between min-h-12 ml-16 py-1.5 mb-6 self-end'>
      <div className='flex items-center'>
        <FaCheckCircle className='ml-2 mr-1' />
        <p className='mr-2'>Задание 1:</p>
        <p>Описание</p>
      </div>
      <div className={'flex items-center justify-center hover:cursor-pointer'}>
        <button className='flex items-center border-black border-[1px] px-2 py-0.5 font-medium hover:bg-gray-300 '>
          <IoMdAdd />
          <p className='pb-0.5'>содержимое</p>
        </button>
        <IoIosArrowDown className={'ml-4 mr-4'} />
      </div>
    </div>
  )
}

interface ModalProps {
  title: string
  description: string
  isOpen: boolean
  onClose: () => void
  onAddLecture: (title: string, description: string) => void
}

const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  onAddLecture,
}) => {
  const [localTitle, setLocalTitle] = useState(title)
  const [localDescription, setLocalDescription] = useState(description)
  const [titleError, setTitleError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleAddClick = () => {
    if (!validateFields()) return
    onAddLecture(localTitle, localDescription)
    onClose()
  }

  const validateFields = () => {
    let isValid = true
    if (!localTitle || localTitle.length > 80) {
      setTitleError('Название должно быть заполнено и не длиннее 80 символов')
      isValid = false
    } else {
      setTitleError('')
    }

    if (!localDescription || localDescription.length > 200) {
      setDescriptionError('Описание должно быть заполнено и не длиннее 200 символов')
      isValid = false
    } else {
      setDescriptionError('')
    }

    return isValid
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(e.target.value)
    if (!e.target.value || e.target.value.length > 80) {
      setTitleError('Название должно быть заполнено и не длиннее 80 символов')
    } else {
      setTitleError('')
    }
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalDescription(e.target.value)
    if (!e.target.value || e.target.value.length > 200) {
      setDescriptionError('Описание должно быть заполнено и не длиннее 200 символов')
    } else {
      setDescriptionError('')
    }
  }

  return (
    <div
      className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        className='bg-white p-4 rounded-lg shadow-lg max-w-lg w-full mx-4'
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className='text-xl font-semibold mb-2'>Добавление лекции</h2>
        <div className='mb-4'>
          <label className='block'>
            Название:
            <input
              type='text'
              className='mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              value={localTitle}
              onChange={handleTitleChange}
              maxLength={80}
            />
            <p className='text-xs text-gray-600'>
              {80 - localTitle.length} символов осталось
            </p>
            {titleError && <p className='text-red-500 text-xs mt-1'>{titleError}</p>}
          </label>
        </div>
        <div className='mb-6'>
          <label className='block'>
            Описание:
            <textarea
              className='mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              value={localDescription}
              onChange={handleDescriptionChange}
              maxLength={200}
            />
            <p className='text-xs text-gray-600'>
              {200 - localDescription.length} символов осталось
            </p>
            {descriptionError && (
              <p className='text-red-500 text-xs mt-1'>{descriptionError}</p>
            )}
          </label>
        </div>
        <div className='flex justify-end space-x-2'>
          <button
            className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700'
            onClick={onClose}
          >
            Отменить
          </button>
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
            onClick={handleAddClick}
          >
            Добавить лекцию
          </button>
        </div>
      </div>
    </div>
  )
}
