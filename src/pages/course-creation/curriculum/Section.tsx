import React, { useState } from 'react'
import { MdModeEdit } from 'react-icons/md'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import {
  SectionAssignment,
  SectionComponentType,
  SectionLecture,
  SectionTest,
  SectionType,
} from '@/pages/course-creation/curriculum/types.ts'
import LectureComponent from '@/pages/course-creation/curriculum/Lecture.tsx'
import TestComponent from '@/pages/course-creation/curriculum/Test.tsx'
import AssignmentComponent from '@/pages/course-creation/curriculum/Assignment.tsx'
import { Modal } from '@/pages/course-creation/curriculum/CurriculumPage.tsx'

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

const Section: React.FC<SectionType> = ({
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

    createComponentAndReturn({ title, description }, modalType)
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
    component: {
      title: string
      description: string
    },
    componentType: SectionComponentType
  ): Promise<SectionLecture | SectionTest | SectionAssignment> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let newItem: SectionLecture | SectionTest | SectionAssignment
        switch (componentType) {
          case 'lecture':
            newItem = {
              componentSerial: lectures.length + 1,
              type: componentType,
              title: component.title,
              description: component.description,
            }
            setItems((prevItems) => [...prevItems, newItem]) // Update items state
            break
          case 'assignment':
            newItem = {
              componentSerial: assignments.length + 1,
              type: componentType,
              title: component.title,
              description: component.description,
            }
            setItems((prevItems) => [...prevItems, newItem]) // Update items state
            break
          case 'test':
            newItem = {
              componentSerial: tests.length + 1,
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
    <div className={'border-2 border-black mt-16 min-h-8 bg-gray-100 py-4 px-2'}>
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
            'bg-white border-[1px] border-black flex items-center ml-16 mt-6 py-1 pl-4 hover:bg-gray-300 w-6/12'
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

export { Section, SectionComponent }
