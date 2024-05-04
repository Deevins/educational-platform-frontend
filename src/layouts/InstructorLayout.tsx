import React from 'react'
import CommonFooter from '@/components/footers/CommonFooter.tsx'
import InstructorHeader from '@/components/headers/InstructorHeader.tsx'

type PropsType = {
  children: React.ReactNode
}

const InstructorLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <>
      <InstructorHeader />
      <div>{children}</div>
      <CommonFooter />
    </>
  )
}

export default InstructorLayout
