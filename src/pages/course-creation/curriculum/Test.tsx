import React, { useEffect, useState } from 'react'
import { FaCheckCircle, FaTrash } from 'react-icons/fa'
import { IoIosArrowDown, IoIosArrowUp, IoMdAdd } from 'react-icons/io'
import {
  api_answer,
  api_question,
  api_test,
  SectionComponentType,
} from '@/pages/course-creation/curriculum/types.ts'
import { MdModeEdit } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

type TestComponentProps = {
  testData: api_test
  onRemove: (id: number, componentType: SectionComponentType) => void
  onUpdate: (id: number, title: string, componentType: SectionComponentType) => void
}

const TestComponent: React.FC<TestComponentProps> = ({
  testData,
  onUpdate,
  onRemove,
}) => {
  const [data, setData] = useState(testData)
  const [editButtonsVisible, setIsEditButtonsVisible] = React.useState(false)
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false)
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null)
  const [isQuestionsVisible, setIsQuestionsVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const { courseID } = useParams()

  const handleAddQuestions = async (newQuestion: api_question) => {
    const endpoint =
      data.questions.length === 0
        ? `http://localhost:8080/courses/add-question-to-test/${data.test_id}`
        : `http://localhost:8080/courses/add-question-to-test/${data.test_id}`

    try {
      const response = await axios.post(endpoint, newQuestion)
      if (response.status !== 200) throw new Error('Error adding question')

      const updatedQuestions =
        selectedQuestionIndex !== null
          ? data.questions.map((question, index) =>
              index === selectedQuestionIndex ? newQuestion : question
            )
          : [...data.questions, newQuestion]

      setData({ ...data, questions: updatedQuestions })
      setIsQuestionModalOpen(false)
      setSelectedQuestionIndex(null)
      onUpdate(data.test_id, data.test_name, 'test') // Обновляем тест после изменений
    } catch (error) {
      console.error('Failed to add question:', error)
    }
  }

  const handleEditQuestion = (index: number) => {
    setSelectedQuestionIndex(index)
    setIsQuestionModalOpen(true)
  }

  const handleDeleteQuestion = async (index: number) => {
    const questionId = data.questions[index].id
    try {
      const response = await axios.post(
        `http://localhost:8080/courses/remove-question-from-test/${questionId}`
      )
      if (response.status !== 200) throw new Error('Error deleting question')

      const updatedQuestions = data.questions.filter((_, i) => i !== index)
      setData({ ...data, questions: updatedQuestions })
      if (updatedQuestions.length === 0) {
        setIsQuestionsVisible(false)
      }
      onUpdate(data.test_id, data.test_name, 'test') // Обновляем тест после изменений
    } catch (error) {
      console.error('Failed to delete question:', error)
    }
  }

  const toggleQuestionsVisibility = () => {
    if (data.questions.length === 0) {
      setIsQuestionsVisible(false)
      return
    }
    setIsQuestionsVisible(!isQuestionsVisible)
  }

  const removeTest = () => {
    onRemove(testData.test_id, 'test')
  }

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  return (
    <>
      <div
        onMouseEnter={() => setIsEditButtonsVisible(true)}
        onMouseLeave={() => setIsEditButtonsVisible(false)}
        className={`bg-white border-black border-2 flex items-center justify-between min-h-12 ml-16 py-1.5 ${!isQuestionsVisible ? 'mb-6' : ''}`}
      >
        <div className='flex items-center'>
          <FaCheckCircle className='mr-2 ml-2' />
          <p>
            Тест {data.serial_number}: {data.test_name}
          </p>
          <span
            className={`flex scale-90 items-center ml-2 ${editButtonsVisible ? 'visible' : 'hidden'} `}
          >
            <MdModeEdit
              className={'mr-4 hover:cursor-pointer'}
              onClick={toggleEditMode}
            />
            <FaTrash className={'mr-4 hover:cursor-pointer'} onClick={removeTest} />
          </span>
        </div>
        <div className={'flex items-center justify-center hover:cursor-pointer'}>
          {data.questions.length === 0 && (
            <button
              className='flex items-center border-black border-[1px] px-2 py-0.5 font-medium hover:bg-gray-300'
              onClick={(e) => {
                e.stopPropagation()
                setIsQuestionModalOpen(true)
                setSelectedQuestionIndex(null)
              }}
            >
              <IoMdAdd />
              <p className='pb-0.5'>Вопросы</p>
            </button>
          )}
          {!isQuestionsVisible ? (
            <IoIosArrowDown className={'ml-4 mr-4'} onClick={toggleQuestionsVisibility} />
          ) : (
            <IoIosArrowUp className={'ml-4 mr-4'} onClick={toggleQuestionsVisibility} />
          )}
        </div>
        <QuestionModal
          isOpen={isQuestionModalOpen}
          onClose={() => {
            setIsQuestionModalOpen(false)
            setSelectedQuestionIndex(null)
          }}
          onSave={handleAddQuestions}
          testID={data.test_id} // Передаем testID в QuestionModal
          initialData={
            selectedQuestionIndex !== null
              ? data.questions[selectedQuestionIndex]
              : undefined
          }
        />
      </div>

      {isQuestionsVisible && data.questions.length > 0 ? (
        <div className='flex flex-col ml-16 border-2 border-t-0 border-black mb-6'>
          <div className={'flex py-4 px-2 items-center bg-white'}>
            <div className='flex items-center'>
              <h1 className='font-bold'>Вопросы</h1>
              <button
                className='bg-black text-white px-1 py-1 ml-4'
                onClick={(e) => {
                  e.stopPropagation()
                  setIsQuestionModalOpen(true)
                  setSelectedQuestionIndex(null)
                }}
              >
                Новый вопрос
              </button>
            </div>
            <Link
              to={`/courses/course/draft/${courseID}/learn`}
              className='bg-black text-white px-1 py-1 ml-auto'
            >
              <button>Предпросмотр</button>
            </Link>
          </div>
          {data.questions.map((question, index) => (
            <QuestionBlock
              key={index}
              index={index}
              question={question}
              handleDeleteQuestion={handleDeleteQuestion}
              handleEditQuestion={handleEditQuestion}
            />
          ))}
        </div>
      ) : null}
    </>
  )
}

export default TestComponent

type TestQuestionProps = {
  question: api_question
  index: number
  handleEditQuestion: (index: number) => void
  handleDeleteQuestion: (index: number) => void
}

const QuestionBlock: React.FC<TestQuestionProps> = ({
  question,
  index,
  handleDeleteQuestion,
  handleEditQuestion,
}) => {
  const [areEditButtonsVisible, setAreEditButtonsVisible] = React.useState(false)
  return (
    <div
      key={index}
      className='flex p-2 bg-white'
      onMouseEnter={() => setAreEditButtonsVisible(true)}
      onMouseLeave={() => setAreEditButtonsVisible(false)}
    >
      <div className={'flex flex-col w-full'}>
        <div className={'flex'}>
          <span>
            {index + 1}. {question.question_body} (несколько вариантов ответа)
          </span>
          {areEditButtonsVisible && (
            <div className={'flex items-center mr-4  ml-auto'}>
              <MdModeEdit
                onClick={() => handleEditQuestion(index)}
                className='cursor-pointer mr-2'
              />
              <FaTrash
                onClick={() => {
                  console.log(`Deleting question ${question.id}...`)
                  handleDeleteQuestion(index)
                }}
                className='cursor-pointer'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const QuestionModal: React.FC<{
  isOpen: boolean
  onClose: () => void
  onSave: (question: api_question) => void
  initialData?: api_question
  testID: number // Добавляем testID как пропс
}> = ({ isOpen, onClose, onSave, initialData, testID }) => {
  const [question, setQuestion] = useState<api_question>({
    id: initialData?.id || 0, // устанавливаем id если есть
    question_body: initialData?.question_body || '',
    answers: initialData?.answers || [],
  })
  const [answers, setAnswers] = useState<api_answer[]>(
    initialData?.answers || [
      {
        response_text: '',
        is_correct: false,
        description: '',
      },
      { response_text: '', is_correct: false, description: '' },
    ]
  )

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    if (initialData) {
      setQuestion(initialData)
      setAnswers(initialData.answers)
    } else {
      setQuestion({ id: 0, question_body: '', answers: [] }) // установим id: 0 по умолчанию
      setAnswers([{ response_text: '', is_correct: false, description: '' }])
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [initialData, isOpen])

  const handleAddAnswer = () => {
    setAnswers([...answers, { response_text: '', is_correct: false, description: '' }])
  }

  const handleAnswerChange = (
    index: number,
    field: keyof api_answer,
    value: string | boolean
  ) => {
    const newAnswers = answers.map((answer, i) =>
      i === index ? { ...answer, [field]: value } : answer
    )
    setAnswers(newAnswers)
  }

  const handleToggleCorrectAnswer = (index: number) => {
    const newAnswers = answers.map((answer, i) =>
      i === index ? { ...answer, is_correct: !answer.is_correct } : answer
    )
    setAnswers(newAnswers)
  }

  const handleSubmit = async () => {
    if (!question.question_body || answers.some((a) => !a.response_text)) {
      alert('Пожалуйста заполните все необходимые поля.')
      return
    }
    if (!answers.some((a) => a.is_correct)) {
      alert('Пожалуйста выберите хотя бы один правильный ответ.')
      return
    }

    const endpoint = question.id
      ? `http://localhost:8080/courses/edit-question/${question.id}`
      : `http://localhost:8080/courses/add-question-to-test/${testID}` // используем ID теста

    try {
      const response = await axios.post(endpoint, {
        data: { ...question, answers },
      })

      if (response.status !== 200) throw new Error('Error saving question')

      onSave({ ...question, answers })
      onClose()
    } catch (error) {
      console.error('Failed to save question:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${isOpen ? 'block' : 'hidden'}`}
      onClick={onClose}
    >
      <div
        className='relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 shadow-lg rounded-md bg-white'
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className='text-lg font-semibold'>
          {initialData ? 'Редактирование вопроса' : 'Добавление вопроса'}
        </h2>
        <button onClick={onClose} className='absolute top-3 right-2 text-xl font-bold'>
          &times;
        </button>

        <div className='my-4'>
          <label className='block text-sm font-medium text-gray-700'>Вопрос</label>
          <textarea
            value={question.question_body}
            onChange={(e) => setQuestion({ ...question, question_body: e.target.value })}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
            rows={3}
          />
        </div>

        {answers.map((answer, index) => (
          <div key={index} className='mb-4 flex flex-col'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                checked={answer.is_correct}
                onChange={() => handleToggleCorrectAnswer(index)}
                className='mr-2'
              />
              <input
                type='text'
                value={answer.response_text}
                onChange={(e) =>
                  handleAnswerChange(index, 'response_text', e.target.value)
                }
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
            <textarea
              value={answer.description}
              onChange={(e) => handleAnswerChange(index, 'description', e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              placeholder='Объяснение ответа'
              rows={2}
            />
          </div>
        ))}
        <div className={'flex justify-between'}>
          <button
            onClick={handleAddAnswer}
            className='px-4 py-2 bg-black text-white hover:bg-gray-600'
          >
            Добавить ответ
          </button>
          <button
            onClick={handleSubmit}
            className='px-4 py-2 bg-black text-white hover:bg-gray-600'
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}
