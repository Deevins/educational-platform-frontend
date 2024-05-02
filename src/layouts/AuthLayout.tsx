import React from 'react'
import styles from '@/layouts/MainLayout.module.scss'
import StudentHeader from '@/components/headers/StudentHeader.tsx'
import CommonFooter from '@/components/footers/CommonFooter.tsx'

type PropsType = {
  children: React.ReactNode
}
const AuthLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <div className={styles.root}>
      <StudentHeader />
      <div className={'h-full z-0'}>{children}</div>
      <CommonFooter />
    </div>
  )
}

export default AuthLayout
