import { Link } from 'react-router-dom'
import { IoIosArrowDown, IoMdAdd, IoMdClose } from 'react-icons/io'
import React, { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im'
import { FaCheckCircle, FaPlus, FaTrash } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'

type TestQuestion = {
  question: string
  answers: TestAnswer[]
}

type TestAnswer = {
  answer: string
  answerIsCorrect: boolean
  answerDescription: string
}

type SectionTest = {
  componentSerial: number
  type: SectionComponentType
  title: string
  description: string
  questions: TestQuestion[]
}
type SectionAssignment = {
  componentSerial: number
  type: SectionComponentType
  title: string
  description: string
}
type SectionLecture = {
  componentSerial: number
  type: SectionComponentType
  title: string
  description: string
}

type Section = {
  sectionNum: number
  title: string
  description: string
  lectures: SectionLecture[]
  tests: SectionTest[]
  assignments: SectionAssignment[]
}

const sections: Section[] = [
  {
    sectionNum: 1,
    title: 'Введение',
    description: 'Введение в курс',
    lectures: [
      {
        componentSerial: 1,
        type: 'lecture',
        title: 'Лекция 1',
        description: 'lecture1  desc',
      },
      {
        componentSerial: 2,
        type: 'lecture',
        title: 'Лекция 2',
        description: 'lecture1  desc',
      },
    ],
    tests: [
      {
        componentSerial: 1,
        type: 'test',
        title: 'Тест 1',
        description: 'test1 desc',
        questions: [
          {
            question: 'Вопрос 1',
            answers: [
              {
                answer: 'Ответ 1',
                answerDescription: 'Описание ответа 1',
                answerIsCorrect: true,
              },
              {
                answer: 'Ответ 2',
                answerDescription: 'Описание ответа 2',
                answerIsCorrect: false,
              },
            ],
          },
        ],
      },
    ],
    assignments: [
      {
        componentSerial: 1,
        type: 'assignment',
        title: 'Задание 1',
        description: 'assignment1 desc',
      },
    ],
  },
]

type SectionComponentType = 'lecture' | 'test' | 'assignment'

const CurriculumPage = () => {
  const [isSectionCreationActive, setIsSectionCreationActive] = React.useState(false)
  const [stateSections, setStateSections] = React.useState<Section[]>(sections)

  const handleSectionCreate = (title: string, description: string) => {
    setStateSections((prev) => [
      ...prev,
      {
        sectionNum: prev.length + 1,
        title: title,
        description: description,
        lectures: [],
        tests: [],
        assignments: [],
      },
    ])

    setIsSectionCreationActive(!isSectionCreationActive)
  }

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
      {stateSections.map((section, index) => (
        <Section
          key={index}
          description={section.description}
          sectionNum={section.sectionNum}
          title={section.title}
          lectures={section.lectures}
          tests={section.tests}
          assignments={section.assignments}
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

// type Section = {
//   title: string
//   description: string
//   lectures: SectionLecture[]
//   tests: SectionTest[]
//   assignments: SectionAssignment[]
// }

const Section: React.FC<Section> = ({
  sectionNum,
  title,
  assignments,
  lectures,
  tests,
}) => {
  const [items, setItems] = React.useState<
    SectionLecture[] | SectionTest[] | SectionAssignment[]
  >([...lectures, ...tests, ...assignments])
  const [isTitleButtonsShown, setIsTitleButtonsShown] = React.useState(false)
  const [isComponentAdditionActive, setIsComponentAdditionActive] = React.useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<SectionComponentType>('lecture') // "lecture", "test", "task"
  const handleAddComponent = () => {
    setIsComponentAdditionActive(!isComponentAdditionActive)
  }

  const handleCreateComponent = (title: string, description: string) => {
    console.log(title, description)

    createComponentAndReturn(sectionNum, { title, description }, modalType)
      .then((newItem) => {
        if (newItem) {
          console.log(`${modalType} added:`, newItem)
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsModalOpen(false)
        setIsComponentAdditionActive(false)
      })
  }

  const handleOpenModal = (type: SectionComponentType) => {
    setModalType(type)
    setIsModalOpen(true)
  }

  const createComponentAndReturn = async (
    sectionNum: number,
    component: {
      title: string
      description: string
    },
    componentType: SectionComponentType
  ): Promise<SectionLecture | SectionTest | SectionAssignment> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const section = sections.find((section) => section.sectionNum === sectionNum)
        if (!section) {
          return
        }

        let newItem: SectionLecture | SectionTest | SectionAssignment
        switch (componentType) {
          case 'lecture':
            newItem = {
              componentSerial: section.lectures.length + 1,
              type: componentType,
              title: component.title,
              description: component.description,
            }
            setItems((prevItems) => [...prevItems, newItem]) // Update items state
            break
          case 'assignment':
            newItem = {
              componentSerial: section.assignments.length + 1,
              type: componentType,
              title: component.title,
              description: component.description,
            }
            setItems((prevItems) => [...prevItems, newItem]) // Update items state
            break
          case 'test':
            newItem = {
              componentSerial: section.tests.length + 1,
              type: componentType,
              title: component.title,
              description: component.description,
              questions: [],
            }
            setItems((prevItems) => [...prevItems, newItem]) // Update items state
            break
        }
        console.log(`update with ${componentType}:`, newItem)
        // Update state with a new array
        setItems([...items, newItem]) // Assuming `items` holds a flat list of all items
        resolve(newItem)
      }, 500)
    })
  }
  return (
    <div className={'border-2 border-black mt-16 min-h-8 bg-gray-100 py-4 px-2 '}>
      <div
        className={'flex mb-8 w-full'}
        onMouseEnter={() => setIsTitleButtonsShown(true)}
        onMouseLeave={() => setIsTitleButtonsShown(false)}
      >
        <h1 className={'font-bold mr-2'}>Часть {sectionNum}:</h1>
        <p>{title}</p>
        <span
          className={`flex scale-90 items-center ml-2 ${isTitleButtonsShown ? 'visible' : 'hidden'} `}
        >
          <MdModeEdit className={'mr-4 hover:cursor-pointer'} />
          <FaTrash className={'mr-4 hover:cursor-pointer'} />
        </span>
      </div>

      {items.map((item, index) => (
        <SectionComponent
          key={index}
          sectionType={item.type}
          lectureData={item as SectionLecture}
          assignmentData={item as SectionAssignment}
          testData={item as SectionTest}
        />
      ))}

      {/*{lectures.map((lecture, index) => (*/}
      {/*  <LectureComponent key={index} lectureData={lecture} />*/}
      {/*))}*/}
      {/*{tests.map((test, index) => (*/}
      {/*  <TestComponent key={index} testData={test} />*/}
      {/*))}*/}
      {/*{assignments.map((assignment, index) => (*/}
      {/*  <AssignmentComponent key={index} assignmentData={assignment} />*/}
      {/*))}*/}
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
                onClick={() => handleOpenModal('lecture')}
              >
                <FaPlus className={'mr-1'} />
                <span className={'font-semibold'}>Лекция</span>
              </button>
              <button
                className={
                  'flex items-center ml-2 text-indigo-400 hover:text-indigo-800 mr-4'
                }
                onClick={() => handleOpenModal('test')}
              >
                <FaPlus className={'mr-1'} />
                <span className={'font-semibold'}>Тест</span>
              </button>
              <button
                className={
                  'flex items-center ml-2 text-indigo-400 hover:text-indigo-800 mr-4'
                }
                onClick={() => handleOpenModal('assignment')}
              >
                <FaPlus className={'mr-1'} />
                <span className={'font-semibold'}>Задание</span>
              </button>
            </div>
            {isModalOpen && (
              <Modal
                modalType={modalType}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddComponent={handleCreateComponent}
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

interface SectionComponentProps {
  sectionType: SectionComponentType
  lectureData?: SectionLecture
  testData?: SectionTest
  assignmentData?: SectionAssignment
}

const SectionComponent: React.FC<SectionComponentProps> = ({
  sectionType,
  lectureData,
  testData,
  assignmentData,
}) => {
  // switch over types of component - lecture, test, assignment

  switch (sectionType) {
    case 'lecture':
      if (lectureData) {
        return <LectureComponent lectureData={lectureData} />
      }
      break
    case 'test':
      if (testData) {
        return <TestComponent testData={testData} />
      }
      break
    case 'assignment':
      if (assignmentData) {
        return <AssignmentComponent assignmentData={assignmentData} />
      }
      break
  }
}

type LectureComponentProps = {
  lectureData: SectionLecture
}

const LectureComponent: React.FC<LectureComponentProps> = ({ lectureData }) => {
  const [editButtonsVisible, setIsEditButtonsVisible] = React.useState(false)
  // here will be request to fetch component data
  // React.useEffect(() => {
  //   console.log('TestComponent mounted')
  //   return () => {
  //     console.log('TestComponent unmounted')
  //   }
  // }, [])
  console.log(`lectureData: ${lectureData.title}`)

  return (
    <div
      className='bg-white border-black border-2 flex items-center justify-between min-h-12 ml-16 py-1.5 mb-6 self-end'
      onMouseEnter={() => setIsEditButtonsVisible(true)}
      onMouseLeave={() => setIsEditButtonsVisible(false)}
    >
      <div className='flex items-center'>
        <FaCheckCircle className='ml-2 mr-1' />
        <p className='mr-2'>Лекция {lectureData.componentSerial}:</p>
        <p>{lectureData.title}</p>
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
  )
}

type TestComponentProps = {
  testData: SectionTest
}

const TestComponent: React.FC<TestComponentProps> = ({ testData }) => {
  const [editButtonsVisible, setIsEditButtonsVisible] = React.useState(false)
  // here will be request to fetch component data
  // React.useEffect(() => {
  //   console.log('TestComponent mounted')
  //   return () => {
  //     console.log('TestComponent unmounted')
  //   }
  // }, [])

  return (
    <div
      className='bg-white border-black border-2 flex items-center justify-between min-h-12 ml-16 py-1.5 mb-6 self-end'
      onMouseEnter={() => setIsEditButtonsVisible(true)}
      onMouseLeave={() => setIsEditButtonsVisible(false)}
    >
      <div className='flex items-center'>
        <FaCheckCircle className='ml-2 mr-1' />
        <p className='mr-2'>Тест {testData.componentSerial}</p>
        <p>{testData.title}</p>
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
          <p className='pb-0.5'>Вопросы</p>
        </button>
        <IoIosArrowDown className={'ml-4 mr-4'} />
      </div>
    </div>
  )
}

type AssignmentComponentProps = {
  assignmentData: SectionAssignment
}
// TODO: implement AssignmentComponent if have time( im dying)
const AssignmentComponent: React.FC<AssignmentComponentProps> = ({ assignmentData }) => {
  const [editButtonsVisible, setIsEditButtonsVisible] = React.useState(false)
  // here will be request to fetch component data
  // React.useEffect(() => {
  //   console.log('TestComponent mounted')
  //   return () => {
  //     console.log('TestComponent unmounted')
  //   }
  // }, [])
  return (
    <div
      className='bg-white border-black border-2 flex items-center justify-between min-h-12 ml-16 py-1.5 mb-6 self-end'
      onMouseEnter={() => setIsEditButtonsVisible(true)}
      onMouseLeave={() => setIsEditButtonsVisible(false)}
    >
      <div className='flex items-center'>
        <FaCheckCircle className='ml-2 mr-1' />
        <p className='mr-2'>Задание {assignmentData.componentSerial}:</p>
        <p>{assignmentData.title}</p>
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
  )
}

interface ModalProps {
  modalType: SectionComponentType
  isOpen: boolean
  onClose: () => void
  onAddComponent: (title: string, description: string) => void
}

const Modal: React.FC<ModalProps> = ({ modalType, isOpen, onClose, onAddComponent }) => {
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
