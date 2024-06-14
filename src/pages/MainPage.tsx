import React from 'react'
import SliderWithImageAndText from '@/components/slider-with-image-and-text.tsx'
import CoursesSection from '@/components/CourseSection/CoursesSection.tsx'
import { Course } from '@/components/CourseSection/CourseCardMini.tsx'
import useSWR from 'swr'
import axios from 'axios'

const fetcher = (url: string) => axios.get<Course[]>(url).then((res) => res.data)

const MainPage: React.FC = () => {
  const { data, error, isLoading } = useSWR(
    'http://localhost:8080/courses/get-latest-eight',
    fetcher
  )

  return (
    <>
      <div className='mt-20 mx-4 sm:mx-10 md:mx-16 lg:mx-[20%] flex flex-col min-h-screen'>
        <SliderWithImageAndText />
        <CoursesSection courses={data} />
        {error && <div>ошибка загрузки</div>}
        {isLoading && <div>загрузка...</div>}
      </div>
    </>
  )
}

export default MainPage
