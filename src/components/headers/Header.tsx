import React, { useState } from 'react'

// Образец данных для выпадающего меню
const dropdownItems = [
  { label: 'Курсы', link: '/courses' },
  { label: 'Профили', link: '/profiles' },
  { label: 'Форум', link: '/forum' },
]

// Тип для элемента выпадающего меню
type DropdownItem = {
  label: string
  link: string
}

const Header: React.FC = () => {
  // Состояние для модального окна поиска
  const [isSearchModalOpen, setSearchModalOpen] = useState(false)
  const userAuthenticated = true // Или ваша логика аутентификации

  // Функция для открытия модального окна поиска
  const openSearchModal = () => {
    setSearchModalOpen(true)
  }

  // Функция для закрытия модального окна поиска
  const closeSearchModal = () => {
    setSearchModalOpen(false)
  }

  // Вспомогательная функция для рендеринга элементов выпадающего меню
  const renderDropdownItems = () => {
    return dropdownItems.map((item: DropdownItem) => (
      <a
        key={item.label}
        href={item.link}
        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
      >
        {item.label}
      </a>
    ))
  }

  return (
    <header className='bg-white shadow'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center py-4'>
          {/* Лого */}
          <div className='flex items-center'>
            <img src='/logo.svg' alt='Logo' className='h-8 mr-4' />
            <span className='text-lg font-semibold'>Образовательная Платформа</span>
          </div>

          {/* Навигационная панель */}
          <nav className='hidden md:flex space-x-4'>
            <button
              onClick={openSearchModal}
              className='text-gray-700 hover:text-gray-900 focus:outline-none'
            >
              Поиск
            </button>
            <div className='relative'>
              <button className='text-gray-700 hover:text-gray-900 focus:outline-none'>
                Меню
              </button>
              <div className='absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-10'>
                {renderDropdownItems()}
              </div>
            </div>
          </nav>

          {/* Кнопки входа/регистрации или аватар пользователя */}
          <div className='flex items-center'>
            {userAuthenticated ? (
              <img
                src='/user-avatar.jpg'
                alt='User Avatar'
                className='h-8 w-8 rounded-full mr-2'
              />
            ) : (
              <>
                <button className='text-gray-700 hover:text-gray-900 focus:outline-none'>
                  Войти
                </button>
                <button className='ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg'>
                  Зарегистрироваться
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Модальное окно поиска */}
      {isSearchModalOpen && (
        <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg w-96'>
            <div className='flex justify-between items-center mb-4'>
              <input
                type='text'
                placeholder='Поиск...'
                className='border border-gray-300 px-4 py-2 rounded-md w-full'
              />
              <div className='border border-gray-300 rounded-md flex'>
                <button className='px-4 py-2 hover:bg-gray-200'>Курсы</button>
                <div className='border-l border-gray-300 h-6'></div>
                <button className='px-4 py-2 hover:bg-gray-200'>Профили</button>
                <div className='border-l border-gray-300 h-6'></div>
                <button className='px-4 py-2 hover:bg-gray-200'>Треды</button>
                {/* Добавьте кнопки для дополнительных объектов поиска */}
              </div>
            </div>
            <button
              onClick={closeSearchModal}
              className='block mx-auto bg-blue-500 text-white px-4 py-2 rounded-lg'
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
