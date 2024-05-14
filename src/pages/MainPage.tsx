import React from 'react'
import SliderWithImageAndText from '@/components/slider-with-image-and-text.tsx'
import CoursesSection from '@/components/CourseSection/CoursesSection.tsx'

// TODO: add pre-fetch courses from redux with types
const courses = [
  {
    title: 'Обучение Python',
    description: 'Описание курса Python',
    url: '/courses/course/1',
  },
  {
    title: 'Разработка на React + Redux',
    description: 'Описание курса React + Redux',
    url: '/courses/course/2',
  },
  {
    title: 'Разработка микросервисов на Go',
    description: 'Описание курса Go',
    url: '/courses/course/3',
  },
  {
    title: 'Разработка на Java',
    description: 'Описание курса разработки мобильных приложений на Java',
    url: '/courses/course/4',
  },
  {
    title: 'Разработка на C#',
    description: 'Описание курса разработки веб-приложений на C#',
    url: '/courses/course/5',
  },
  {
    title: 'Разработка на C++',
    description: 'Разработка на самом сложном и мощном языке программирования',
    url: '/courses/course/6',
  },
]
const MainPage: React.FC = () => {
  return (
    <>
      <div className='mt-20 mx-4 sm:mx-10 md:mx-16 lg:mx-[20%] flex flex-col min-h-screen'>
        <SliderWithImageAndText />
        <CoursesSection courses={courses} />
      </div>
    </>
  )
}

export default MainPage
