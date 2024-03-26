import React from 'react'

import styles from './MainLayout.module.scss'
import Navbar from '@/pages/Navbar.tsx'

type PropsType = {
  children: React.ReactNode
}

export const MainLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <div className={styles.root}>
      <Navbar />
      <div className={'mt-20 h-full'}>{children}</div>
    </div>
  )
}
