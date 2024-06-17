import React, { useEffect, useState } from 'react'
import SliderWithImageAndText from '@/components/slider-with-image-and-text.tsx'
import CoursesSection from '@/components/CourseSection/CoursesSection.tsx'
import { Course } from '@/components/CourseSection/CourseCardMini.tsx'
import axios from 'axios'

const MainPage: React.FC = () => {
  const [data, setData] = useState<Course[]>([])
  useEffect(() => {
    const getHasUserTried = async () => {
      const res = await axios.get<Course[]>(
        `http://localhost:8080/courses/get-latest-eight`
      )
      if (res.status === 200) {
        setData(res.data)
      }
      if (res.data.length <= 0 || res.status !== 200) {
        return
      }
    }

    getHasUserTried()
  }, [])
  return (
    <>
      <div className='mt-20 mx-4 sm:mx-10 md:mx-16 lg:mx-[20%] flex flex-col min-h-screen'>
        <SliderWithImageAndText />
        <CoursesSection courses={data} />
      </div>
    </>
  )
}

export default MainPage
