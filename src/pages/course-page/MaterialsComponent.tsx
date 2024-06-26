import React from 'react'
import { CourseInfo } from '@/pages/course-page/CoursePage.tsx'

type MaterialsComponentProps = {
  courseInfo: CourseInfo
}

export const MaterialsComponent: React.FC<MaterialsComponentProps> = ({ courseInfo }) => {
  return (
    <div className='max-w-4xl mx-auto  p-6 bg-white rounded-xl shadow-md mb-8 w-full'>
      <h2 className='text-xl font-bold'>Требования</h2>
      <ul className='list-disc pl-5'>
        {courseInfo.requirements.map((requirement, index) => (
          <li key={index}>{requirement}</li>
        ))}
      </ul>
      <h2 className='text-xl font-bold mt-6'>Описание</h2>{' '}
      {/* TODO: add html insert to db and render here */}
      {/*<p>*/}
      {/*  Обзор 5 технологий по созданию динамических Web-сайтов: HTML, CSS, JavaScript,*/}
      {/*  PHP, MySQL.*/}
      {/*</p>*/}
      {/*<p>*/}
      {/*  На этом видеокурсе мы написали очень простой Web-сайт с целью прояснить*/}
      {/*  взаимодействие Web-технологий...*/}
      {/*</p>*/}
      {/*<p>Курс состоит из 3 разделов:</p>*/}
      {/*<ol className='list-decimal pl-5'>*/}
      {/*  <li>Frontend - клиентская часть с технологиями HTML + CSS + JavaScript.</li>*/}
      {/*  <li>Backend - серверная часть с технологиями PHP + MySQL.</li>*/}
      {/*  <li>*/}
      {/*    Видеокурс состоит из 9 коротких уроков, на каждом из которых мы рассматриваем*/}
      {/*    отдельную технологию...*/}
      {/*  </li>*/}
      {/*</ol>*/}
      {courseInfo.description}
      <h2 className='text-xl font-bold mt-6'>Для кого этот курс:</h2>
      <ul className='list-disc pl-5 mb-6'>
        {courseInfo.target_audience.map((whom, index) => (
          <li key={index}>{whom}</li>
        ))}
      </ul>
    </div>
  )
}
