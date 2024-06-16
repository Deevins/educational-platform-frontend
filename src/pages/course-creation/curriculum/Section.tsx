import React, { useState } from 'react'
import { MdModeEdit } from 'react-icons/md'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import {
  api_lecture,
  api_section,
  api_test,
  SectionComponentType,
} from '@/pages/course-creation/curriculum/types.ts'
import LectureComponent from '@/pages/course-creation/curriculum/Lecture.tsx'
import TestComponent from '@/pages/course-creation/curriculum/Test.tsx'
import { Modal } from '@/pages/course-creation/curriculum/CurriculumPage.tsx'
import axios from 'axios'

interface SectionComponentProps {
  sectionType: SectionComponentType
  lectureData?: api_lecture
  testData?: api_test
  onRemove: (id: number, componentType: SectionComponentType) => void
  onUpdate: (id: number, title: string, componentType: SectionComponentType) => void
}

const SectionComponent: React.FC<SectionComponentProps> = ({
  sectionType,
  lectureData,
  testData,
  onUpdate,
  onRemove,
}) => {
  switch (sectionType) {
    case 'lecture':
      if (lectureData) {
        return (
          <LectureComponent
            lectureData={lectureData}
            onUpdate={onUpdate}
            onRemove={onRemove}
          />
        )
      }
      break
    case 'test':
      if (testData) {
        return (
          <TestComponent testData={testData} onUpdate={onUpdate} onRemove={onRemove} />
        )
      }
      break
  }
  return null // Ensure all paths return a value
}

interface SectionProps {
  section: api_section
  onSectionUpdate: () => void // Новый пропс
}

const Section: React.FC<SectionProps> = ({ onSectionUpdate, section }) => {
  const [items] = React.useState<(api_lecture | api_test)[]>([
    ...section.lectures,
    ...section.tests,
  ])
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
      .catch((error) => console.error(error))
      .finally(() => {
        setIsModalOpen(false)
        setIsComponentAdditionActive(false)
        onSectionUpdate()
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
  ) => {
    switch (componentType) {
      case 'lecture':
        try {
          await axios.post(
            `http://localhost:8080/courses/create-lecture/${section.section_id}`,
            {
              title: component.title,
              description: component.description,
            }
          )
          onSectionUpdate()
          console.log(onSectionUpdate())
        } catch (error) {
          console.error(error)
        }

        break
      case 'test':
        try {
          await axios.post(
            `http://localhost:8080/courses/create-test/${section.section_id}`,
            {
              title: component.title,
              description: component.description,
            }
          )
          onSectionUpdate()
        } catch (error) {
          console.error(error)
        }

        break
    }
  }

  const onUpdate = async (
    id: number,
    newTitle: string,
    componentType: SectionComponentType
  ) => {
    switch (componentType) {
      case 'lecture':
        try {
          console.log(id, newTitle, componentType)
          await axios.post(`http://localhost:8080/courses/update-lecture-title/${id}`, {
            title: newTitle,
          })
          onSectionUpdate()
          console.log(onSectionUpdate())
        } catch (error) {
          console.error(error)
        }

        break
      case 'test':
        try {
          await axios.post(`http://localhost:8080/courses/update-test-title/${id}`, {
            title: newTitle,
          })
        } catch (error) {
          console.error(error)
        } finally {
          onSectionUpdate()
        }

        break
    }
  }

  const onRemove = async (id: number, componentType: SectionComponentType) => {
    switch (componentType) {
      case 'lecture':
        try {
          await axios.post(`http://localhost:8080/courses/remove-lecture/${id}`)
          onSectionUpdate()
          console.log(onSectionUpdate())
        } catch (error) {
          console.error(error)
        }

        break
      case 'test':
        try {
          await axios.post(`http://localhost:8080/courses/remove-test/${id}`)
          onSectionUpdate()
          console.log(onSectionUpdate())
        } catch (error) {
          console.error(error)
        }

        break
    }
  }

  const handleUpdateComponent = (
    id: number,
    title: string,
    componentType: SectionComponentType
  ) => {
    onUpdate(id, title, componentType).catch((error) => console.error(error))
  }

  const handleDeleteComponent = (id: number, componentType: SectionComponentType) => {
    onRemove(id, componentType).catch((error) => console.error(error))
  }

  return (
    <div className={'border-2 border-black mt-10 min-h-8 bg-gray-100 py-4 px-2'}>
      <div
        className={'flex mb-8 w-full'}
        onMouseEnter={() => setIsTitleButtonsShown(true)}
        onMouseLeave={() => setIsTitleButtonsShown(false)}
      >
        <h1 className={'font-bold mr-2'}>Часть {section.serial_number}:</h1>
        <p>{section.section_title}</p>
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
          lectureData={item as api_lecture}
          testData={item as api_test}
          onUpdate={handleUpdateComponent}
          onRemove={handleDeleteComponent}
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
