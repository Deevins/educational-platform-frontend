import React, { useEffect, useState } from 'react'
import { FaCheckCircle, FaTrash } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'
import { IoIosArrowDown, IoMdAdd } from 'react-icons/io'
import {
  SectionTest,
  TestAnswer,
  TestQuestion,
} from '@/pages/course-creation/curriculum/types.ts'

type TestComponentProps = {
  testData: SectionTest
}

const TestComponent: React.FC<TestComponentProps> = ({ testData }) => {
  const [data, setData] = React.useState<SectionTest>(testData)
  const [questions, setQuestions] = useState<TestQuestion[]>(testData.questions)

  const [editButtonsVisible, setIsEditButtonsVisible] = React.useState(false)
  const [isQuestionModalOpen, setIsQuestionModalOpen] = React.useState(false)

  const handleAddQuestion = (newQuestion: TestQuestion) => {
    setQuestions([...questions, newQuestion])
    setData({ ...data, questions: [...questions, newQuestion] })
    setIsQuestionModalOpen(false) // Закрыть модальное окно после добавления вопроса
    console.log(data)
  }

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
        <p className='mr-2'>Тест {data.componentSerial}</p>
        <p>{data.title}</p>
        <span
          className={`flex scale-90 items-center ml-2 ${editButtonsVisible ? 'visible' : 'hidden'} `}
        >
          <MdModeEdit className={'mr-4 hover:cursor-pointer'} />
          <FaTrash className={'mr-4 hover:cursor-pointer'} />
        </span>
      </div>
      <div className={'flex items-center justify-center hover:cursor-pointer'}>
        <button
          className='flex items-center border-black border-[1px] px-2 py-0.5 font-medium hover:bg-gray-300 '
          onClick={() => setIsQuestionModalOpen(true)}
        >
          <IoMdAdd />
          <p className='pb-0.5'>Вопросы</p>
        </button>
        <IoIosArrowDown className={'ml-4 mr-4'} />
      </div>
      <QuestionModal
        isOpen={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
        onSave={handleAddQuestion}
      />
    </div>
  )
}

export default TestComponent

const QuestionModal: React.FC<{
  isOpen: boolean
  onClose: () => void
  onSave: (question: TestQuestion) => void
}> = ({ isOpen, onClose, onSave }) => {
  const [question, setQuestion] = useState<string>('')
  const [answers, setAnswers] = useState<TestAnswer[]>([
    { answer: '', answerIsCorrect: false, answerDescription: '' },
    { answer: '', answerIsCorrect: false, answerDescription: '' },
  ])
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

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
    const newAnswers = answers.map((answer, i) => {
      if (i === index) {
        return { ...answer, [field]: value }
      }
      return answer
    })
    setAnswers(newAnswers)
  }

  const handleToggleCorrectAnswer = (index: number) => {
    const newAnswers = answers.map((answer, answerIndex) => {
      if (answerIndex === index) {
        return { ...answer, answerIsCorrect: !answer.answerIsCorrect }
      }
      return answer
    })
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    if (!question.trim()) {
      setErrorMessage('Поле вопроса обязательно для заполнения.')
      return
    }
    const filledAnswers = answers.filter((a) => a.answer.trim())
    const correctAnswers = filledAnswers.filter((a) => a.answerIsCorrect)
    const incorrectAnswers = filledAnswers.filter((a) => !a.answerIsCorrect)

    if (
      filledAnswers.length < 2 ||
      correctAnswers.length === 0 ||
      incorrectAnswers.length === 0
    ) {
      setErrorMessage(
        'Вопрос должен содержать минимум один правильный и один неправильный ответ.'
      )
      return
    }

    onSave({ question, answers })
    resetForm()
  }

  const resetForm = () => {
    setQuestion('')
    setAnswers([{ answer: '', answerIsCorrect: false, answerDescription: '' }])
    setErrorMessage('')
    onClose()
  }

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent click inside the modal from closing it
  }

  return (
    <div
      className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${isOpen ? 'block' : 'hidden'}`}
      onClick={resetForm}
    >
      <div
        className='relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 shadow-lg rounded-md bg-white'
        onClick={handleModalClick}
      >
        <h2 className='text-lg font-semibold'>Добавить вопрос</h2>
        <button onClick={resetForm} className='absolute top-3 right-2 text-xl font-bold'>
          &times;
        </button>

        <div className='my-4'>
          <label className='block text-sm font-medium text-gray-700'>Вопрос</label>
          <input
            value={question}
            placeholder={'Добавьте вопрос...'}
            onChange={(e) => setQuestion(e.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
            required
          />
        </div>

        {answers.map((answer, index) => (
          <div key={index} className='mb-4'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                checked={answer.answerIsCorrect}
                onChange={() => handleToggleCorrectAnswer(index)}
                className='mr-2 rounded'
              />
              <input
                type='text'
                value={answer.answer}
                placeholder={'Добавьте ответ...'}
                onChange={(e) => handleAnswerChange(index, 'answer', e.target.value)}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                required
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

        {errorMessage && <div className='text-red-500 text-sm mb-2'>{errorMessage}</div>}
        <div className={'flex justify-between'}>
          <button
            onClick={handleAddAnswer}
            className='px-4 py-2 bg-gray-200 hover:bg-gray-300 '
          >
            Добавить ответ
          </button>
          <button onClick={handleSubmit} className='px-4 py-2 bg-black text-white'>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}
