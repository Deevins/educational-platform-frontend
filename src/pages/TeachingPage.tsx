import React from 'react'
import { IconType } from 'react-icons'
import { FaAddressBook } from 'react-icons/fa' // Импорт иконок

interface ImageBlockProps {
  icon: IconType
  title: string
  description: string
}

const ImageBlock: React.FC<ImageBlockProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className='w-full md:w-1/3 mb-8 md:mb-0'>
      <div className='flex flex-col items-center'>
        <Icon size={48} className='text-blue-500 mb-4' />
        <h3 className='text-lg font-semibold mb-2'>{title}</h3>
        <p className='text-gray-700'>{description}</p>
      </div>
    </div>
  )
}

const TeachingPage: React.FC = () => {
  return (
    <div>
      <div className='bg-gray-200'>
        <div
          className='w-4/5 mx-auto bg-cover bg-center py-16 text-center text-gray-700'
          style={{ backgroundImage: "url('your_image_url.jpg')" }}
        >
          <h1 className='text-3xl font-semibold mb-4'>Come teach with us</h1>
          <p className='text-lg mb-8'>
            Become an instructor and change lives — including your own
          </p>
          <button className='bg-blue-500 text-white px-8 py-2 rounded-full hover:bg-blue-600'>
            Get Started
          </button>
        </div>
      </div>
      <div className='py-16 text-center flex items-center flex-col'>
        <h2 className='text-3xl font-semibold mb-8'>So many reasons to start</h2>
        <div className='flex flex-wrap justify-center'>
          <ImageBlock icon={FaAddressBook} title='Title 1' description='Description 1' />
          <ImageBlock icon={FaAddressBook} title='Title 2' description='Description 2' />
          <ImageBlock icon={FaAddressBook} title='Title 3' description='Description 3' />
        </div>
      </div>
    </div>
  )
}

export default TeachingPage
