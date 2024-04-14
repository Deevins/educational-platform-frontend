import React from 'react'

import styles from './MainLayout.module.scss'
import Header from '@/components/Header'

type PropsType = {
  children: React.ReactNode
}

export const MainLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <div className={styles.root}>
      <Header />
      <div className={'h-full'}>{children}</div>
    </div>
  )
}
