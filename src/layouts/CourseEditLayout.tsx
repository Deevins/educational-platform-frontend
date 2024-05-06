import React from 'react'
import CommonFooter from '@/components/footers/CommonFooter.tsx'
import CourseEditHeader from '@/components/headers/CourseEditHeader.tsx'

type PropsType = {
  children: React.ReactNode
}
const CourseEditLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <>
      <CourseEditHeader />
      <div>{children}</div>
      <CommonFooter />
    </>
  )
}

export default CourseEditLayout
