import React from 'react'

import styles from './MainLayout.module.scss'
import CommonFooter from '@/components/footers/CommonFooter.tsx'
import StudentHeader from '@/components/headers/StudentHeader.tsx'
import InstructorHeader from '@/components/headers/InstructorHeader.tsx'

type PropsType = {
  children: React.ReactNode
}

type Roles = 'student' | 'instructor'

export const MainLayout: React.FC<PropsType> = ({ children }) => {
  // const currentRole: Roles = 'instructor'
  const currentRole: Roles = 'student'

  return (
    <div className={styles.root}>
      {currentRole === ('student' as Roles) ? <StudentHeader /> : <InstructorHeader />}
      <div className={'h-screen'}>{children}</div>
      <CommonFooter />
    </div>
  )
}
