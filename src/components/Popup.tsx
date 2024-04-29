import React from 'react'

type PopupProps = {
  type: 'error' | 'info'
  text: string
  styles?: React.CSSProperties
  isPopupTriggered: boolean
}

const Popup: React.FC<PopupProps> = ({ type, text, styles, isPopupTriggered }) => {
  const color = type === 'error' ? 'bg-red-500' : 'bg-blue-500'

  return isPopupTriggered ? (
    <div
      className={`fixed bottom-4 right-4 text-white px-16 py-6 rounded shadow ${color} transition ${styles}`}
    >
      <p>{text}</p>
    </div>
  ) : null
}

export default Popup
