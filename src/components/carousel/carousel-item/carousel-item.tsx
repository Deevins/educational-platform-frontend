import React from 'react'

interface CarouselItemProps {
  image: string
  title: string
  text: string
}

const CarouselItem: React.FC<CarouselItemProps> = ({ image, title, text }) => {
  return (
    <div
      className='relative h-80 md:h-64 lg:h-80 xl:h-96 rounded-2xl bg-cover bg-center'
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-lg p-3 md:p-4 lg:p-5 w-70% h-20%'>
        <div className='text-center'>
          <h2 className='font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2'>
            {title}
          </h2>
          <p className='text-sm md:text-base lg:text-lg xl:text-xl'>{text}</p>
        </div>
      </div>
    </div>
  )
}

export default CarouselItem
