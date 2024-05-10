import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // импортируем стили

const CourseMessagesPage: React.FC = () => {
  const [greeting, setGreeting] = useState('')
  const [congratulation, setCongratulation] = useState('')

  console.log(greeting, congratulation)

  return (
    <div className='mx-auto max-w-4xl bg-white p-6 rounded-lg shadow-2xl'>
      <h1 className='text-2xl font-bold mb-6'>Сообщения курса</h1>
      <p className='mb-4'>
        Чтобы привлечь студентов к работе с материалами курса, напишите сообщения
        (необязательно), которые будут автоматически отправляться им после регистрации на
        курс или его завершения. Если вы не хотите отправлять сообщения с приветствием или
        поздравлениями, оставьте эти текстовые поля пустыми.
      </p>
      <div className='mb-6'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>Приветствие</label>
        <ReactQuill theme='snow' value={greeting} onChange={setGreeting} />
      </div>
      <div className='mb-6'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>Поздравление</label>
        <ReactQuill theme='snow' value={congratulation} onChange={setCongratulation} />
      </div>
    </div>
  )
}

export default CourseMessagesPage
