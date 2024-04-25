import React from 'react'

interface CarouselItemProps {
  image: string
  title: string
  text: string
}

const CarouselItem: React.FC<CarouselItemProps> = ({ image, title, text }) => {
  return (
    <div
      className={'h-[30rem] rounded-2xl'}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        width: '100%',
        zIndex: '-1',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '45%',
          background: 'white',
          zIndex: '-2',
        }}
        className={'w-[45%] h-[39%] rounded-bl p-3 pl-[3.5%] opacity-80'}
      >
        <div
          style={{
            zIndex: '44',
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        >
          <h2 className={'font-bold text-2xl pb-2 '}>{title}</h2>
          <p className={' text-xl'}>{text}</p>
        </div>
      </div>
    </div>
  )
}

export default CarouselItem
