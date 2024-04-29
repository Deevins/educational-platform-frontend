import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from '@/layouts/MainLayout.module.scss'
import AuthHeader from '@/components/headers/AuthHeader.tsx'

type PropsType = {
  children: React.ReactNode
}
const AuthLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <div className={styles.root}>
      <AuthHeader />
      <div className={'h-full'}>{children}</div>
      <Footer />
    </div>
  )
}

export default AuthLayout

const Footer: React.FC = () => {
  return (
    <footer className='bg-gray-100 text-black py-4 text-center z-10'>
      <p>Название вашей платформы</p>
      <p>Телефон для связи: +7 (XXX) XXX-XX-XX</p>
      <div className='mt-4'>
        <NavLink to='/privacy' className='mr-4'>
          Политика конфиденциальности
        </NavLink>
        <NavLink to='/terms-of-service'>Публичная оферта</NavLink>
      </div>
    </footer>
  )
}
