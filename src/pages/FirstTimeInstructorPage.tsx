import React from 'react'
import { IconType } from 'react-icons'
import { NavLink } from 'react-router-dom'
import { BsAwardFill, BsChatLeftHeart, BsFeather } from 'react-icons/bs'

interface ImageBlockProps {
  icon: IconType
  title: string
  description: string
}

interface ColumnProps {
  amount: string
  label: string
}

const ImageBlock: React.FC<ImageBlockProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className='w-full md:w-[25%] mb-8 md:mb-0 px-2 md:px-4 '>
      <div className='lg:h-64'>
        <div className='flex p-4 justify-center'>
          <Icon size={48} className='text-blue-500' />
        </div>
        <div className='text-center p-4'>
          <h3 className='text-lg font-semibold mb-2'>{title}</h3>
          <p className='text-gray-700'>{description}</p>
        </div>
      </div>
    </div>
  )
}

const Column: React.FC<ColumnProps> = ({ amount, label }) => {
  return (
    <div className='text-center flex flex-col items-center px-[2.4rem] py-[1.6rem] '>
      <p className='text-4xl font-bold'>{amount}</p>
      <p className={`font-semibold text-lg`}>{label}</p>
    </div>
  )
}

const FirstTimeInstructorPage = () => {
  return (
    <>
      <div className='bg-gray-300'>
        <div
          className='w-4/5 mx-auto bg-cover bg-center py-16 text-center text-black'
          style={{ backgroundImage: "url('your_image_url.jpg')" }}
        >
          <h1 className='text-3xl font-semibold mb-4'>Учите у нас</h1>
          <p className='text-lg mb-8 text-gray-700'>
            Станьте преподавателем и меняйте жизни к лучшему — включая свою
          </p>
          <NavLink to='/'>
            <button className='bg-black text-white px-16 py-4 hover:bg-gray-800'>
              Начать
            </button>
          </NavLink>
        </div>
      </div>
      <div className='py-16 text-center'>
        <h2 className='text-3xl font-semibold mb-8'>Так много причин начать</h2>
        <div className='flex flex-col md:flex-row justify-center gap-8 md:gap-16 items-center ml-4 md:ml-0'>
          <ImageBlock
            icon={BsFeather}
            title='Учите, как вам нравится'
            description='Сами выбирайте курсы для публикации так, как вам захочется, а также сохраняйте полный контроль над своими материалами.'
          />
          <ImageBlock
            icon={BsChatLeftHeart}
            title='Вдохновляйте студентов'
            description='Делитесь знаниями и помогайте своим студентам находить новые увлечения, получать новые навыки и добиваться успехов в карьере.'
          />
          <ImageBlock
            icon={BsAwardFill}
            title='Получайте отдачу'
            description='Расширяйте профессиональные связи и знания.'
          />
        </div>
      </div>
      <div className='bg-purple-600 text-white py-16 '>
        <div className='flex justify-center'>
          <Column amount='62 млн' label='Студенты' />
          <Column amount='75+' label='Языки' />
          <Column amount='830 млн' label='Регистраций' />
          <Column amount='180+' label='Страны' />
        </div>
      </div>
    </>
  )
}

export default FirstTimeInstructorPage
