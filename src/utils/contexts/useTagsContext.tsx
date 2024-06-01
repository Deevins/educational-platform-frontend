import React, { createContext, useContext, useEffect, useState } from 'react'

// Определяем контекст для управления состоянием тегов
const TagsContext = createContext<string[]>([])

// Компонент-обертка, который предоставляет доступ к состоянию тегов
export const TagsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    // Пример получения тегов с сервера
    const fetchedTags = [
      'tag1',
      'tag2',
      'tag3',
      'rrr',
      'ttt',
      'qqq',
      'sss',
      'taaaag2',
      'ccc',
    ] // Пример полученных тегов
    setTags(fetchedTags)
  }, [])

  return <TagsContext.Provider value={tags}>{children}</TagsContext.Provider>
}

// Хук для использования состояния тегов в компонентах
export const useTags = () => useContext(TagsContext)
