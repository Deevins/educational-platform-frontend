import React, { useState } from 'react'
import { TestQuestion } from '@/pages/course-creation/curriculum/types.ts'

const TestSection: React.FC<{ questions: TestQuestion[] }> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number | null }>({})
  const [testCompleted, setTestCompleted] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [testStarted, setTestStarted] = useState(false)

  const handleAnswerSelect = (index: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: index,
    }))
    setSelectedAnswer(index)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(userAnswers[currentQuestionIndex + 1] || null)
    } else {
      handleSubmitResults()
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setSelectedAnswer(userAnswers[currentQuestionIndex - 1] || null)
    }
  }

  const handleSubmitResults = () => {
    setTestCompleted(true)
  }

  const handleStartTest = () => {
    setTestStarted(true)
  }

  return (
    <div className='container px-4 py-2 ml-[10%]'>
      {!testStarted ? (
        <div className='bg-white shadow-md rounded-lg p-6 text-center'>
          <h1 className='text-2xl font-bold mb-4'>Test Description</h1>
          <p>
            This is the description of the test. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
          <button
            onClick={handleStartTest}
            className='px-6 py-2 mt-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700'
          >
            Start Test
          </button>
        </div>
      ) : !testCompleted ? (
        <div className='bg-white shadow-md rounded-lg p-6'>
          <div className='text-xl font-semibold mb-4'>
            {questions[currentQuestionIndex].question}
          </div>
          <div className='space-y-4'>
            {questions[currentQuestionIndex].answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`block w-full text-left p-4 rounded-lg border-2 ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-100'
                    : 'border-gray-300 hover:bg-gray-100'
                }`}
              >
                {answer.answer}
              </button>
            ))}
          </div>
          <div className='flex justify-between mt-6'>
            <button
              onClick={handlePreviousQuestion}
              className='px-6 py-2 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-700'
              disabled={currentQuestionIndex === 0}
            >
              Previous Question
            </button>
            <button
              onClick={handleNextQuestion}
              className='px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700'
              disabled={selectedAnswer === null}
            >
              {currentQuestionIndex < questions.length - 1
                ? 'Next Question'
                : 'Submit Results'}
            </button>
          </div>
        </div>
      ) : (
        <div className='bg-white shadow-md rounded-lg p-6 text-center'>
          <h1 className='text-2xl font-bold mb-4'>Test Completed</h1>
          <p>
            Thank you for completing the test. Your results have been submitted
            successfully.
          </p>
          {questions.map((question, index) => (
            <div key={index} className='mb-8 bg-gray-50 p-4 rounded-lg shadow'>
              <div className='text-lg font-semibold mb-2'>{question.question}</div>
              {question.answers.map((answer, ansIndex) => (
                <div
                  key={ansIndex}
                  className={`p-3 rounded-lg mb-2 ${
                    userAnswers[index] === ansIndex
                      ? answer.answerIsCorrect
                        ? 'bg-green-100 border-green-500'
                        : 'bg-red-100 border-red-500'
                      : 'bg-white'
                  } border-2`}
                >
                  {answer.answer}
                  {(userAnswers[index] === ansIndex || !answer.answerIsCorrect) && (
                    <div className='text-sm text-gray-600 italic mt-2'>
                      — {answer.answerDescription}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TestSection
