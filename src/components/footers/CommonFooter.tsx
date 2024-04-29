import { NavLink } from 'react-router-dom'
import React from 'react'

const CommonFooter: React.FC = () => {
  return (
    <footer className='bg-gray-800 text-gray-300 py-4 w-full'>
      <hr className='border-gray-700 my-4' />
      <div className='container mx-auto text-center'>
        <div className='flex flex-col md:flex-row justify-between'>
          <div className='w-full md:w-1/2'>
            <h3 className='text-lg font-bold'>ProdigyPath Education</h3>
            <p>Здесь обучаются все!</p>
            <ul className='mt-2'>
              <li>
                <NavLink to='/courses'>Все курсы</NavLink>
              </li>
              <li>
                <NavLink to='/forum'>Форум</NavLink>
              </li>
              <li>
                <NavLink to='https://facebook.com/'>Facebook</NavLink>
              </li>
              <li>
                <NavLink to='https://twitter.com/'>Twitter</NavLink>
              </li>
              <li>
                <NavLink to='https://vk.com'>VK</NavLink>
              </li>
            </ul>
          </div>
          <div className='w-full md:w-1/4 mt-4 md:mt-0'>
            <h3 className='text-lg font-bold'>Контакты</h3>
            <p>Телефон: +7-800-555-35-35</p>
            <p>Почта: prodigy@education.com</p>
          </div>
          <div className='w-full md:w-1/4 mt-4 md:mt-0'>
            <h3 className='text-lg font-bold'>Правовая информация</h3>
            <ul className='mt-2'>
              <li>
                <NavLink to='/terms-of-service'>Условия использования</NavLink>
              </li>
              <li>
                <NavLink to='/privacy'>Политика конфиденциальности</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default CommonFooter
