import { Link } from 'react-router-dom'
import { IoMdAdd } from 'react-icons/io'
import React, { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im'
import {
  SectionComponentType,
  SectionType,
} from '@/pages/course-creation/curriculum/types.ts'
import { Section } from '@/pages/course-creation/curriculum/Section.tsx'

const sections: SectionType[] = [
  {
    serial_number: 1,
    section_title: 'Введение',
    section_description: 'Введение в курс',
    lectures: [
      {
        serial_number: 1,
        type: 'lecture',
        title: 'Лекция 1',
        description: 'lecture1  desc',
        video_url: '',
      },
      {
        video_url: '',
        serial_number: 2,
        type: 'lecture',
        title: 'Лекция 2',
        description: 'lecture1  desc',
      },
    ],
    tests: [
      {
        serial_number: 1,
        type: 'test',
        test_name: 'Тест 1',
        description: 'test1 desc',
        questions: [
          // {
          //   question: 'Вопрос 1',
          //   answers: [
          //     {
          //       answer: 'Ответ 1',
          //       answerDescription: 'Описание ответа 1',
          //       answerIsCorrect: true,
          //     },
          //     {
          //       answer: 'Ответ 2',
          //       answerDescription: 'Описание ответа 2',
          //       answerIsCorrect: false,
          //     },
          //   ],
          // },
        ],
      },
    ],
  },
]

const CurriculumPage = () => {
  const [isSectionCreationActive, setIsSectionCreationActive] = React.useState(false)
  const [stateSections, setStateSections] = React.useState<SectionType[]>(sections)
  // const { courseID } = useParams<{ courseID: string }>()

  // useEffect(() => {
  //   // Fetch sections from API
  //
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get<api_section[]>(
  //         `http://localhost:8080/courses/get-course-materials/${courseID}`
  //       )
  //
  //     } catch (error) {
  //       console.error('Error fetching data:', error)
  //     }
  //   }
  //
  //   fetchData()
  //
  //
  //
  //
  //   console.log(response)
  // }, [stateSections])

  const handleSectionCreate = (title: string, description: string) => {
    setStateSections((prev) => [
      ...prev,
      {
        serial_number: prev.length + 1,
        section_description: description,
        section_title: title,
        lectures: [],
        tests: [],
      },
    ])

    setIsSectionCreationActive(!isSectionCreationActive)
  }

  return (
    <div className='mx-auto max-w-4xl bg-white p-6 rounded-lg shadow-2xl w-full'>
      <h1 className='text-2xl font-bold mb-4'>Учебный план</h1>
      <hr className='border-t border-gray-400 mb-8 w-full opacity-75' />
      <p>
        Начните составлять свой курс, создав секции, лекции, практические задания и тесты
        <Link
          to={'/course-creation/plan-your-practice-activities/'}
          className={'text-blue-700 underline pb-4'}
        >
          (тесты, упражнения по написанию кода и задания){'  '}
        </Link>
        . Используйте{' '}
        <Link
          to={'/course-creation/outline-your-course/'}
          className={'text-blue-700 underline pb-4'}
        >
          план курса
        </Link>{' '}
        для выстраивания структуры материалов и понятной маркировки разделов и лекций.
      </p>
      {stateSections.map((section, index) => (
        <Section
          key={index}
          section_description={section.section_description}
          section_title={section.section_title}
          lectures={section.lectures}
          serial_number={section.serial_number}
          tests={section.tests}
        />
      ))}

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
          <div
            className={
              'bg-gray-100 flex align-middle rounded-sm px-2 py-1 hover:cursor-pointer hover:bg-gray-200'
            }
            onClick={() => setIsSectionCreationActive(true)}
          >
            <button
              className={`w-12 h-8 rounded border-dotted bg-white
             flex justify-center items-center visible `}
            >
              <IoMdAdd />
            </button>
            <p className={'ml-4 mt-0.5'}>Добавить секцию</p>
          </div>
        )}
      </div>

      {isSectionCreationActive && (
        <NewSectionBlock
          onSave={(title: string, description: string) => {
            handleSectionCreate(title, description)
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

export interface ModalProps {
  modalType: SectionComponentType
  isOpen: boolean
  onClose: () => void
  onAddComponent: (title: string, description: string) => void
}

export const Modal: React.FC<ModalProps> = ({
  modalType,
  isOpen,
  onClose,
  onAddComponent,
}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [titleError, setTitleError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')

  // Валидация и обработка блокировки скроллинга
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Валидация полей перед добавлением
  const validateFields = () => {
    let isValid = true
    if (!title || title.length > 80) {
      setTitleError('Название должно быть заполнено и не длиннее 80 символов')
      isValid = false
    } else {
      setTitleError('')
    }

    if (!title || (title.length > 80 && (!description || description.length > 200))) {
      setDescriptionError('Описание должно быть заполнено и не длиннее 200 символов')
      isValid = false
    } else {
      setDescriptionError('')
    }

    return isValid
  }

  // Обработчик добавления контента
  const addContent = () => {
    if (!validateFields()) return
    onAddComponent(title, description)
    setTitle('')
    setDescription('')
    onClose() // Закрыть модальное окно после добавления
  }

  if (!isOpen) return null

  return (
    <div
      className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'
      onClick={() => onClose()}
    >
      <div
        className='bg-white p-4 rounded-lg shadow-lg max-w-lg w-full mx-4'
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className='text-xl font-semibold mb-2'>
          {modalType === 'lecture'
            ? 'Добавить лекцию'
            : modalType === 'test'
              ? 'Добавить тест'
              : 'Добавить задание'}
        </h2>
        <input
          type='text'
          placeholder='Название'
          className='mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {titleError && <p className='text-red-500 text-xs mt-1'>{titleError}</p>}
        <p className='text-xs text-gray-600'>{80 - title.length} символов осталось</p>

        <div>
          <textarea
            placeholder='Описание'
            className='mt-2 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {descriptionError && (
            <p className='text-red-500 text-xs mt-1'>{descriptionError}</p>
          )}
          <p className='text-xs text-gray-600'>
            {200 - description.length} символов осталось
          </p>
        </div>

        <div className='flex justify-end space-x-2 mt-4'>
          <button
            className='px-4 py-2 bg-white rounded hover:bg-gray-100 border-black border-2 text-black'
            onClick={onClose}
          >
            Отменить
          </button>
          <button
            className='px-4 py-2 bg-black text-white rounded hover:bg-gray-600'
            onClick={addContent}
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  )
}
