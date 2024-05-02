import React from 'react'

import styles from './MainLayout.module.scss'
import CommonFooter from '@/components/footers/CommonFooter.tsx'
import StudentHeader from '@/components/headers/StudentHeader.tsx'

type PropsType = {
  children: React.ReactNode
}

export const MainLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <div className={styles.root}>
      <StudentHeader />
      <div className={'h-screen'}>{children}</div>
      <CommonFooter />
    </div>
  )
}
