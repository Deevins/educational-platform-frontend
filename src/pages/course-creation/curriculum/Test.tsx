import React, { useEffect, useState } from 'react'
import { FaCheckCircle, FaTrash } from 'react-icons/fa'
import { IoIosArrowDown, IoIosArrowUp, IoMdAdd } from 'react-icons/io'
import {
  SectionTest,
  TestAnswer,
  TestQuestion,
} from '@/pages/course-creation/curriculum/types.ts'
import { MdModeEdit } from 'react-icons/md'

type TestComponentProps = {
  testData: SectionTest
}

const TestComponent: React.FC<TestComponentProps> = ({ testData }) => {
  const [data, setData] = useState(testData)
  const [editButtonsVisible, setIsEditButtonsVisible] = React.useState(false)
  const [questions, setQuestions] = useState(testData.questions)
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false)
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null)
  const [isQuestionsVisible, setIsQuestionsVisible] = useState(false) // Состояние видимости вопросов

  const handleAddQuestion = (newQuestion: TestQuestion) => {
    const updatedQuestions =
      selectedQuestionIndex !== null
        ? questions.map((question, index) =>
            index === selectedQuestionIndex ? newQuestion : question
          )
        : [...questions, newQuestion]

    setQuestions(updatedQuestions)
    setData({ ...data, questions: updatedQuestions })
    setIsQuestionModalOpen(false)
    setSelectedQuestionIndex(null)
  }

  const handleEditQuestion = (index: number) => {
    setSelectedQuestionIndex(index)
    setIsQuestionModalOpen(true)
  }

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index)
    setQuestions(updatedQuestions)
    setData({ ...data, questions: updatedQuestions })
    if (updatedQuestions.length === 0) {
      setIsQuestionsVisible(false)
    }
  }

  const toggleQuestionsVisibility = () => {
    if (questions.length === 0) {
      setIsQuestionsVisible(false)
      return
    }
    setIsQuestionsVisible(!isQuestionsVisible)
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
            Тест {data.componentSerial}: {data.title}
          </p>
          <span
            className={`flex scale-90 items-center ml-2 ${editButtonsVisible ? 'visible' : 'hidden'} `}
          >
            <MdModeEdit className={'mr-4 hover:cursor-pointer'} />
            <FaTrash className={'mr-4 hover:cursor-pointer'} />
          </span>
        </div>
        <div className={'flex items-center justify-center hover:cursor-pointer'}>
          {questions.length === 0 && (
            <button
              className='flex items-center border-black border-[1px] px-2 py-0.5 font-medium hover:bg-gray-300'
              onClick={(e) => {
                e.stopPropagation() // Prevents the questions visibility from toggling
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
          onSave={handleAddQuestion}
          initialData={
            selectedQuestionIndex !== null ? questions[selectedQuestionIndex] : undefined
          }
        />
      </div>

      {isQuestionsVisible && questions.length > 0 ? (
        <div className='flex flex-col ml-16 border-2 border-t-0 border-black mb-6'>
          <div className={'flex py-4 px-2 items-center bg-white'}>
            <div className='flex items-center'>
              <h1 className='font-bold'>Вопросы</h1>
              <button
                className='bg-black text-white px-1 py-1 ml-4'
                onClick={(e) => {
                  e.stopPropagation() // Prevents the questions visibility from toggling
                  setIsQuestionModalOpen(true)
                  setSelectedQuestionIndex(null)
                }}
              >
                Новый вопрос
              </button>
            </div>
            <button className='bg-black text-white px-1 py-1 ml-auto'>
              Предпросмотр
            </button>
          </div>
          {questions.map((question, index) => (
            <QuestionBlock
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
  question: TestQuestion
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
            {index + 1}. {question.question} (несколько вариантов ответа)
          </span>
          {areEditButtonsVisible && (
            <div className={'flex items-center mr-4  ml-auto'}>
              <MdModeEdit
                onClick={() => handleEditQuestion(index)}
                className='cursor-pointer mr-2'
              />
              <FaTrash
                onClick={() => handleDeleteQuestion(index)}
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
  onSave: (question: TestQuestion) => void
  initialData?: TestQuestion
}> = ({ isOpen, onClose, onSave, initialData }) => {
  const [question, setQuestion] = useState<string>('')
  const [answers, setAnswers] = useState<TestAnswer[]>([
    {
      answer: '',
      answerIsCorrect: false,
      answerDescription: '',
    },
    { answer: '', answerIsCorrect: false, answerDescription: '' },
  ])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    if (initialData) {
      setQuestion(initialData.question)
      setAnswers(initialData.answers)
    } else {
      setQuestion('')
      setAnswers([{ answer: '', answerIsCorrect: false, answerDescription: '' }])
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [initialData, isOpen])

  const handleAddAnswer = () => {
    setAnswers([
      ...answers,
      { answer: '', answerIsCorrect: false, answerDescription: '' },
    ])
  }

  const handleAnswerChange = (
    index: number,
    field: keyof TestAnswer,
    value: string | boolean
  ) => {
    const newAnswers = answers.map((answer, i) =>
      i === index ? { ...answer, [field]: value } : answer
    )
    setAnswers(newAnswers)
  }

  const handleToggleCorrectAnswer = (index: number) => {
    const newAnswers = answers.map((answer, i) =>
      i === index ? { ...answer, answerIsCorrect: !answer.answerIsCorrect } : answer
    )
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    // Проверяем, что все обязательные поля заполнены
    if (!question || answers.some((a) => !a.answer)) {
      alert('Пожалуйста заполните все необходимые поля.')
      return
    }
    // Проверяем, что хотя бы один ответ отмечен как правильный
    if (!answers.some((a) => a.answerIsCorrect)) {
      alert('Пожалуйста выберите хотя бы один правильный ответ.')
      return
    }
    // Сохраняем вопрос и ответы
    onSave({ question, answers })
    onClose()
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
          {initialData ? 'Edit Question' : 'Add Question'}
        </h2>
        <button onClick={onClose} className='absolute top-3 right-2 text-xl font-bold'>
          &times;
        </button>

        <div className='my-4'>
          <label className='block text-sm font-medium text-gray-700'>Вопрос</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
            rows={3}
          />
        </div>

        {answers.map((answer, index) => (
          <div key={index} className='mb-4 flex flex-col'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                checked={answer.answerIsCorrect}
                onChange={() => handleToggleCorrectAnswer(index)}
                className='mr-2'
              />
              <input
                type='text'
                value={answer.answer}
                onChange={(e) => handleAnswerChange(index, 'answer', e.target.value)}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              />
            </div>
            <textarea
              value={answer.answerDescription}
              onChange={(e) =>
                handleAnswerChange(index, 'answerDescription', e.target.value)
              }
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              placeholder='Объяснение ответа'
              rows={2}
            />
          </div>
        ))}
        <div className={'flex justify-between'}>
          <button
            onClick={handleAddAnswer}
            className='px-4 py-2 bg-gray-300 text-black hover:bg-gray-400'
          >
            Добавить ответ
          </button>
          <button
            onClick={handleSubmit}
            className='px-4 py-2 bg-black text-white hover:bg-gray-800'
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}