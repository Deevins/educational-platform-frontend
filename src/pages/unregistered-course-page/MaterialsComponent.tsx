import React from 'react'
import { CourseInfo } from '@/pages/unregistered-course-page/UnregisteredCoursePage.tsx'

type MaterialsComponentProps = {
  courseInfo: CourseInfo
}

export const MaterialsComponent: React.FC<MaterialsComponentProps> = () => {
  return (
    <div className='max-w-4xl mx-auto  p-6 bg-white rounded-xl shadow-md mb-8'>
      <h2 className='text-xl font-bold'>Требования</h2>
      <ul className='list-disc pl-5'>
        <li>Иметь понятие о Web-технологиях</li>
      </ul>

      <h2 className='text-xl font-bold mt-6'>Описание</h2>
      <p>
        Обзор 5 технологий по созданию динамических Web-сайтов: HTML, CSS, JavaScript,
        PHP, MySQL.
      </p>
      <p>
        На этом видеокурсе мы написали очень простой Web-сайт с целью прояснить
        взаимодействие Web-технологий...
      </p>
      <p>Курс состоит из 3 разделов:</p>
      <ol className='list-decimal pl-5'>
        <li>Frontend - клиентская часть с технологиями HTML + CSS + JavaScript.</li>
        <li>Backend - серверная часть с технологиями PHP + MySQL.</li>
        <li>
          Видеокурс состоит из 9 коротких уроков, на каждом из которых мы рассматриваем
          отдельную технологию...
        </li>
      </ol>

      <h2 className='text-xl font-bold mt-6'>Для кого этот курс:</h2>
      <ul className='list-disc pl-5 mb-6'>
        <li>Начинающие web-мастера</li>
        <li>Начинающие программисты</li>
      </ul>
    </div>
  )
}
