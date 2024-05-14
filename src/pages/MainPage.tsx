import React from 'react'
import SliderWithImageAndText from '@/components/slider-with-image-and-text.tsx'
import CoursesSection from '@/components/CourseSection/CoursesSection.tsx'

// TODO: add pre-fetch courses from redux with types
const courses = [
  {
    title: 'Курс 1',
    description: 'Описание курса 1',
    url: '/courses/course/1',
  },
  {
    title: 'Курс 2',
    description: 'Описание курса 2',
    url: '/courses/course/2',
  },
  {
    title: 'Курс 3',
    description: 'Описание курса 3',
    url: '/courses/course/3',
  },
  {
    title: 'Курс 4',
    description: 'Описание курса 4',
    url: '/courses/course/4',
  },
  {
    title: 'Курс 5',
    description: 'Описание курса 5',
    url: '/courses/course/5',
  },
  {
    title: 'Курс 6',
    description: 'Описание курса 6',
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
