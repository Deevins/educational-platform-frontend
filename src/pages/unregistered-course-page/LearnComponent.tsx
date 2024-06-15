import React from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { CourseInfo } from '@/pages/unregistered-course-page/UnregisteredCoursePage.tsx'

type LearnComponentProps = {
  courseInfo: CourseInfo
}

export const LearnComponent: React.FC<LearnComponentProps> = ({ courseInfo }) => {
  return (
    <div className='max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md'>
      <h2 className='text-lg font-bold'>В конце этого курса вы сможете:</h2>
      <ul className={'flex flex-col'}>
        {courseInfo.course_goals.map((goal, index) => (
          <li key={index} className={'flex text-center items-center'}>
            <AiOutlineCheck className={'mr-2'} />
            <p className={'pb-1'}>{goal}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
