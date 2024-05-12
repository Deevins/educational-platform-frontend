import React, { useState } from 'react'
import { TestQuestion } from '@/pages/course-creation/curriculum/types.ts'

const TestSection: React.FC<{ questions: TestQuestion[] }> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number | null }>({})
  const [testCompleted, setTestCompleted] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

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
      setSelectedAnswer(null) // Reset selection for the next question
    } else {
      setTestCompleted(true) // Finish the test if it was the last question
    }
  }

  const handleRetakeTest = () => {
    setTestCompleted(false)
    setCurrentQuestionIndex(0)
    setUserAnswers({})
    setSelectedAnswer(null)
  }

  return (
    <div className='container mx-auto px-4 py-2'>
      {!testCompleted ? (
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
          <button
            onClick={handleNextQuestion}
            className='mt-6 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700'
            disabled={selectedAnswer === null} // Disable if no answer is selected
          >
            {currentQuestionIndex < questions.length - 1
              ? 'Next Question'
              : 'Finish Test'}
          </button>
        </div>
      ) : (
        <div className='bg-white shadow-md rounded-lg p-6'>
          <h1 className='text-2xl font-bold mb-4'>Test Completed</h1>
          {questions.map((question, index) => (
            <div key={index} className='mb-4'>
              <div className='text-lg font-semibold'>{question.question}</div>
              {question.answers.map((answer, ansIndex) => (
                <div
                  key={ansIndex}
                  className={`p-4 rounded-lg border-2 ${
                    userAnswers[index] === ansIndex
                      ? answer.answerIsCorrect
                        ? 'border-green-500 bg-green-100'
                        : 'border-red-500 bg-red-100'
                      : 'border-gray-300'
                  }`}
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
          <button
            onClick={handleRetakeTest}
            className='mt-4 px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-700'
          >
            Retake Test
          </button>
        </div>
      )}
    </div>
  )
}

export default TestSection
