import React from 'react'
import SliderWithImageAndText from '@/components/slider-with-image-and-text.tsx'
import CoursesSection from '@/components/CourseSection/CoursesSection.tsx'

// TODO: add pre-fetch courses from redux with tpyes
const courses = [
  {
    title: 'Курс 1',
    description: 'Описание курса 1',
    url: '/courses/1',
  },
  {
    title: 'Курс 2',
    description: 'Описание курса 2',
    url: '/courses/2',
  },
  {
    title: 'Курс 3',
    description: 'Описание курса 3',
    url: '/courses/3',
  },
]
const MainPage: React.FC = () => {
  return (
    <div className={'flex flex-col'}>
      <div className={'mt-20 mr-[20%] ml-[20%] flex flex-col'}>
        <SliderWithImageAndText />
        <CoursesSection courses={courses} sectionTitle='Все курсы' />
      </div>
    </div>
  )
}

export default MainPage
