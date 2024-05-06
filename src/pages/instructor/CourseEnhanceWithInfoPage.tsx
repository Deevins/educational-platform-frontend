import React, { useState } from 'react'

const CourseEnhanceWithInfoPage: React.FC = () => {
  const [formData, setFormData] = useState({
    targetStudents: false,
    videoSchema: false,
    syllabus: false,
    subtitles: false,
    accessibility: false,
    pricePage: false,
    courseMessages: false,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(`Form data: ${JSON.stringify(formData, null, 2)}`)
  }

  return (
    <div className='max-w-4xl mx-auto p-8 bg-white shadow-md rounded'>
      <h1 className='text-2xl font-bold mb-4'>Fullstack разработка ReactJS + Golang</h1>
      <form onSubmit={handleSubmit}>
        {/* Section: Target Students */}
        <div className='mb-6'>
          <h2 className='text-xl font-semibold'>Целевые учащиеся</h2>
          <label className='block mt-2'>
            <input
              type='checkbox'
              name='targetStudents'
              className='form-checkbox'
              onChange={handleChange}
              checked={formData.targetStudents}
            />
            <span className='ml-2'>Целевое обучение</span>
          </label>
        </div>

        {/* Section: Course Content Creation */}
        <div className='mb-6'>
          <h2 className='text-xl font-semibold'>Создание содержания курса</h2>
          <label className='block mt-2'>
            <input
              type='checkbox'
              name='videoSchema'
              className='form-checkbox'
              onChange={handleChange}
              checked={formData.videoSchema}
            />
            <span className='ml-2'>Схема видео и монтаж</span>
          </label>
          <label className='block mt-2'>
            <input
              type='checkbox'
              name='syllabus'
              className='form-checkbox'
              onChange={handleChange}
              checked={formData.syllabus}
            />
            <span className='ml-2'>Учебный план</span>
          </label>
          <label className='block mt-2'>
            <input
              type='checkbox'
              name='subtitles'
              className='form-checkbox'
              onChange={handleChange}
              checked={formData.subtitles}
            />
            <span className='ml-2'>Субтитры</span>
          </label>
        </div>

        {/* Section: Course Publication */}
        <div className='mb-6'>
          <h2 className='text-xl font-semibold'>Публикация курса</h2>
          <label className='block mt-2'>
            <input
              type='checkbox'
              name='pricePage'
              className='form-checkbox'
              onChange={handleChange}
              checked={formData.pricePage}
            />
            <span className='ml-2'>Ценовая страница курса</span>
          </label>
          <label className='block mt-2'>
            <input
              type='checkbox'
              name='courseMessages'
              className='form-checkbox'
              onChange={handleChange}
              checked={formData.courseMessages}
            />
            <span className='ml-2'>Сообщения курса</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Отправить на проверку
        </button>
      </form>
    </div>
  )
}

export default CourseEnhanceWithInfoPage
