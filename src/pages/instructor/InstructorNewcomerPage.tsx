import React from 'react'

const InstructorNewcomerPage: React.FC = () => {
  return (
    <div className='relative flex min-h-screen items-center '>
      {/* Main Content */}
      <div className='flex-1 flex flex-col items-center pl-20 md:pl-30'>
        <div className='p-6 max-w-4xl mx-auto bg-white x'>
          <h1 className='text-2xl font-bold mb-2'>План действий такой</h1>
          <p className='text-gray-600 border-b-2 border-black pb-2'>
            Советы, методы и источники мотивации прямо на электронной почте
          </p>
          <div className='space-y-4 mb-4'>
            {[
              'Выберите тему для вашего курса.',
              'Составьте цели обучения и план курса.',
              'Напишите сценарий и отрепетируйте свое выступление.',
              'Приготовьтесь к записи',
              'Отредактируйте ваш курс',
              'Запишите материалы курса',
              'Публикация курса',
            ].map((step, index) => (
              <div key={index} className='border-t pt-2'>
                <strong>Шаг {index + 1}.</strong> {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstructorNewcomerPage
