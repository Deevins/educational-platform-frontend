import React from 'react'

import styles from './MainLayout.module.scss'
import StudentHeader from '@/components/headers/StudentHeader.tsx'
import CommonFooter from '@/components/footers/CommonFooter.tsx'

type PropsType = {
  children: React.ReactNode
}

export const MainLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <div className={styles.root}>
      <StudentHeader />
      <div>{children}</div>
      <CommonFooter />
    </div>
  )
}
