import React, { createContext, useContext, useState } from 'react'

type NotificationContextType = {
  message: string
  type: 'success' | 'error'
  showMessage: (message: string, type: 'success' | 'error') => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotification = () => useContext(NotificationContext)!

type NotificationProviderProps = {
  children: React.ReactNode // Define the type for children here
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState<'success' | 'error'>('success')

  const showMessage = (message: string, type: 'success' | 'error') => {
    setMessage(message)
    setType(type)
    setVisible(true)
    setTimeout(() => setVisible(false), 3000) // hide after 3 seconds
  }

  return (
    <NotificationContext.Provider value={{ message, type, showMessage }}>
      {children}
      {visible && (
        <div
          className={`fixed bottom-10 right-10 p-4 rounded ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}
        >
          {message}
        </div>
      )}
    </NotificationContext.Provider>
  )
}
