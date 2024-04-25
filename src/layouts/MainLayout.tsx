import React from 'react'

import styles from './MainLayout.module.scss'
import Header from '@/components/Header'
import { NavLink } from 'react-router-dom'

type PropsType = {
  children: React.ReactNode
}

export const MainLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <div className={styles.root}>
      <Header />
      <div className={'h-full'}>{children}</div>
      <Footer />
    </div>
  )
}

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-gray-300 py-4 s w-full'>
      <div className='container mx-auto text-center'>
        <hr className='border-gray-700 my-4' />
        <div className='flex flex-col md:flex-row justify-between'>
          <div className='w-full md:w-1/2'>
            <h3 className='text-lg font-bold'>Ваше название компании</h3>
            <p>Мы обучаем профессионалов</p>
            <ul className='mt-2'>
              <li>
                <NavLink to='#'>Все курсы</NavLink>
              </li>
              <li>
                <NavLink to='#'>Форум</NavLink>
              </li>
              <li>
                <NavLink to='#'>Facebook</NavLink>
              </li>
              <li>
                <NavLink to='#'>Twitter</NavLink>
              </li>
              <li>
                <NavLink to='#'>VK</NavLink>
              </li>
            </ul>
          </div>
          <div className='w-full md:w-1/2 mt-4 md:mt-0'>
            <h3 className='text-lg font-bold'>Контакты</h3>
            <p>Телефон: +123456789</p>
            <p>Почта: example@example.com</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
