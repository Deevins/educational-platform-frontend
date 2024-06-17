import React, { useEffect, useState } from 'react'
import { HiOutlinePlus } from 'react-icons/hi'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const CourseEnhanceWithInfoPage: React.FC = () => {
  return (
    <>
      <CourseDetails />
    </>
  )
}

type QA = {
  id: number
  description: string
  question: string
  answers: answer[]
}
type answer = {
  answer: string
  placeholder: string
}
const initialQuestions: QA[] = [
  {
    id: 1,
    question: 'Что студенты будут изучать в вашем курсе?',
    description:
      'Необходимо ввести не меньше 4 целей обучения или итогов, на которые учащиеся могут рассчитывать после завершения вашего курса.',
    answers: [
      {
        answer: '',
        placeholder: 'Введите ответ',
      },
      { answer: '', placeholder: 'Введите ответ...' },
      { answer: '', placeholder: 'Введите ответ...' },
    ],
  },
  {
    id: 2,
    question: 'Есть ли у вашего курса какие-либо (предварительные) требования?',
    description:
      'Список необходимых навыков, знаний, инструментов и оборудования, которыми должны владеть учащиеся до зачисления на ваш курс.\n' +
      'Если у вас нет особых требований, используйте данное поле, чтобы привлечь больше начинающих учащихся.',
    answers: [
      {
        answer: '',
        placeholder: 'Введите ответ',
      },
      { answer: '', placeholder: 'Введите ответ...' },
      { answer: '', placeholder: 'Введите ответ...' },
    ],
  },
  {
    id: 3,
    question: 'Для кого предназначен этот курс?',
    description:
      'Составьте подробное описание целевых учащихся вашего курса, которым были бы полезны ваши материалы.\n' +
      'Это поможет вам привлечь правильную аудиторию для курса.',
    answers: [
      { answer: '', placeholder: 'Введите ответ...' },
      { answer: '', placeholder: 'Введите ответ...' },
      { answer: '', placeholder: 'Введите ответ...' },
    ],
  },
]

const CourseDetails: React.FC = () => {
  const [questions, setQuestions] = useState<QA[]>(initialQuestions)

  const { courseID } = useParams<{ courseID: string }>()

  useEffect(() => {
    axios
      .get<{
        goals: string[]
        requirements: string[]
        target_audience: string[]
      }>(`http://localhost:8080/courses/get-course-goals/${courseID}`)
      .then((response) => {
        const { goals, requirements, target_audience } = response.data
        const newQuestions = questions.map((q) => {
          if (q.id === 1) {
            return {
              ...q,
              answers: goals.map((goal) => ({
                answer: goal,
                placeholder: 'Введите ответ...',
              })),
            }
          } else if (q.id === 2) {
            return {
              ...q,
              answers: requirements.map((requirement) => ({
                answer: requirement,
                placeholder: 'Введите ответ...',
              })),
            }
          } else if (q.id === 3) {
            return {
              ...q,
              answers: target_audience.map((audience) => ({
                answer: audience,
                placeholder: 'Введите ответ...',
              })),
            }
          }
          return q
        })
        setQuestions(newQuestions)
      })
      .catch((error) => {
        console.error('Error fetching course goals:', error)
      })
  }, [courseID])

  const handleAddAnswer = (id: number) => {
    const newQuestions = questions.map((q) => {
      if (q.id === id) {
        return {
          ...q,
          answers: [...q.answers, { answer: '', placeholder: 'Новый ответ' }],
        }
      }
      return q
    })
    setQuestions(newQuestions)
  }

  const handleAnswerChange = (id: number, index: number, value: string) => {
    const newQuestions = questions.map((q) => {
      if (q.id === id) {
        const newAnswers = q.answers.map((item, idx) =>
          idx === index ? { ...item, answer: value } : item
        )
        return { ...q, answers: newAnswers }
      }
      return q
    })
    setQuestions(newQuestions)
  }

  const handleRemoveAnswer = (id: number, index: number) => {
    const newQuestions = questions.map((q) => {
      if (q.id === id && q.answers.length > 1) {
        const newAnswers = q.answers.filter((_, idx) => idx !== index)
        return { ...q, answers: newAnswers }
      }
      return q
    })
    setQuestions(newQuestions)
  }

  const gatherData = () => {
    const goals = questions[0].answers.map((a) => a.answer)
    const requirements = questions[1].answers.map((a) => a.answer)
    const target_audience = questions[2].answers.map((a) => a.answer)
    return { goals, requirements, target_audience }
  }

  const handleSubmit = async () => {
    const data = gatherData()
    try {
      await axios.put(`http://localhost:8080/courses/update-course-goals/${courseID}`, {
        goals: data.goals,
        requirements: data.requirements,
        target_audience: data.target_audience,
      })
    } catch (error) {
      alert(
        'Произошла ошибка при отправке данных. Проверьте консоль для получения дополнительной информации.'
      )
    }
  }

  return (
    <div className='mx-auto max-w-4xl bg-white p-6 rounded-lg shadow-2xl'>
      <h1 className='text-xl font-bold mb-4'>Целевые учащиеся</h1>
      <hr className={'border-1 bg-black w-full'} />
      <p className={'pt-4 pb-2 text-sm'}>
        Данное описание будет доступно всем пользователям на целевой странице курса и
        окажет непосредственное влияние на успешность вашего курса. Это описание поможет
        учащимся понять, подходит ли им данный курс.
      </p>
      {questions.map((question) => (
        <QuestionBlock
          key={question.id}
          questionId={question.id}
          question={question.question}
          description={question.description}
          answers={question.answers}
          onAddAnswer={handleAddAnswer}
          onAnswerChange={handleAnswerChange}
          onRemoveAnswer={handleRemoveAnswer}
        />
      ))}
      <button
        className='mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
        onClick={handleSubmit}
      >
        Отправить данные
      </button>
    </div>
  )
}
export default CourseEnhanceWithInfoPage

type Answer = {
  answer: string
  placeholder: string
}

type Props = {
  question: string
  answers: Answer[]
  questionId: number
  description: string
  onAddAnswer: (questionId: number) => void
  onAnswerChange: (questionId: number, index: number, value: string) => void
  onRemoveAnswer: (questionId: number, index: number) => void
}

const QuestionBlock: React.FC<Props> = ({
  question,
  answers,
  questionId,
  description,
  onAddAnswer,
  onAnswerChange,
  onRemoveAnswer,
}) => {
  return (
    <div className='mb-4'>
      <h3 className='text-xl font-bold py-2'>{question}</h3>
      <p>{description}</p>
      {answers.map((item, index) => (
        <div key={index} className='relative group mt-2'>
          <input
            type='text'
            className='p-2 w-full border rounded pl-3 pr-20'
            value={item.answer}
            placeholder={item.placeholder}
            onChange={(e) => onAnswerChange(questionId, index, e.target.value)}
            maxLength={160}
          />
          <span className='absolute right-3 top-0 h-full px-2 py-2 pointer-events-none flex items-center text-sm text-gray-600'>
            {item.answer.length}/160
          </span>
          {item.answer && answers.length > 1 && (
            <button
              className='absolute inset-y-0 right-2 px-4 bg-red-400 text-white rounded-r hidden group-hover:block'
              onClick={() => onRemoveAnswer(questionId, index)}
              style={{ marginRight: '-2rem' }}
            >
              X
            </button>
          )}
        </div>
      ))}
      <button
        className='flex items-center mt-3 lg:text-[16px] text-sm text-purple-700 font-semibold hover:text-blue-700 hover:border-b-[1px] hover:border-black mb-1'
        onClick={() => onAddAnswer(questionId)}
      >
        <HiOutlinePlus className={'mr-1'} /> Дополнить ответ
      </button>
    </div>
  )
}
