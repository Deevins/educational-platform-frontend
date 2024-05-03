import React from 'react'

import styles from './MainLayout.module.scss'
import StudentHeader from '@/components/headers/StudentHeader.tsx'
import InstructorHeader from '@/components/headers/InstructorHeader.tsx'
import CommonFooter from '@/components/footers/CommonFooter.tsx'

type PropsType = {
  children: React.ReactNode
}

type Roles = 'student' | 'instructor'

export const MainLayout: React.FC<PropsType> = ({ children }) => {
  const [currentRole, setCurrentRole] = React.useState<Roles>('student')

  const handleSwitchRole = () => {
    if (currentRole === 'student') {
      setCurrentRole('instructor')
      return
    }
    setCurrentRole('student')
  }
  // const currentRole: Roles = 'instructor'
  // const currentRole: Roles = 'student'

  return (
    <div className={styles.root}>
      <button onClick={handleSwitchRole}>switch role</button>
      {currentRole === ('student' as Roles) ? <StudentHeader /> : <InstructorHeader />}
      <div>{children}</div>
      <CommonFooter />
    </div>
  )
}

// <div className="">
//   <div className="">{children}</div>
//   <div className="bg-gray-800 text-white py-4 text-center">
//     Это ваш футер. Он зафиксирован внизу страницы.
//   </div>
// </div>
