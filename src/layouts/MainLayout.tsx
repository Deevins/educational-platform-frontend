import React from 'react'

import styles from './MainLayout.module.scss'
import CommonFooter from '@/components/footers/CommonFooter.tsx'
import CommonHeader from '@/components/headers/CommonHeader.tsx'

type PropsType = {
  children: React.ReactNode
}

export const MainLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <div className={styles.root}>
      <CommonHeader />
      <div className={'h-screen'}>{children}</div>
      <CommonFooter />
    </div>
  )
}
