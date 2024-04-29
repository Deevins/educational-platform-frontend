import React from 'react'

interface PopupProps {
  type: 'error' | 'info' // Добавил тип 'info' для примера
  text: string
  styles?: string // Опциональный параметр для стилей
  isPopupTriggered: boolean
}

const Popup: React.FC<PopupProps> = ({ type, text, styles, isPopupTriggered }) => {
  const color = type === 'error' ? 'bg-red-500' : 'bg-blue-500'
  const [isVisible, setIsVisible] = React.useState(true)

  React.useEffect(() => {
    if (isPopupTriggered) {
      const timeoutId = setTimeout(() => {
        setIsVisible(false)
      }, 2500)

      return () => clearTimeout(timeoutId)
    }
  }, [isPopupTriggered])

  return (
    <>
      {isPopupTriggered && isVisible && (
        <div
          className={`fixed bottom-4 right-4 text-white px-4 py-2 rounded shadow ${color} ${styles === undefined ? '' : styles}`}
        >
          <p>{text}</p>
        </div>
      )}
    </>
  )
}

export default Popup
