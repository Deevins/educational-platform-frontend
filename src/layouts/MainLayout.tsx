import React from 'react'

import styles from './MainLayout.module.scss'
import CommonFooter from '@/components/footers/CommonFooter.tsx'
import Header from '@/components/headers/Header.tsx'

type PropsType = {
  children: React.ReactNode
}

export const MainLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <div className={styles.root}>
      <Header />
      <div className={'h-screen'}>{children}</div>
      <CommonFooter />
    </div>
  )
}
