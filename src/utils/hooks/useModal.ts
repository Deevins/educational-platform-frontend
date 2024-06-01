import React from 'react'

type UseModalType = {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
  ref: React.RefObject<HTMLDivElement>
}

const useModal = (): UseModalType => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const ref = React.useRef<HTMLDivElement>(null)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closeModal()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen, ref])

  return { isOpen, openModal, closeModal, ref }
}

export default useModal
