import React, { useState } from 'react'
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

const Column: React.FC<ColumnProps> = ({ amount, label }) => {
  return (
    <div className='text-center flex flex-col items-center px-[2.4rem] py-[1.6rem] '>
      <p className='text-4xl font-bold'>{amount}</p>
      <p className={`font-semibold text-lg`}>{label}</p>
    </div>
  )
}

const ImageBlock: React.FC<ImageBlockProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className='w-full md:w-[25%] mb-8 md:mb-0 px-2 md:px-4'>
      <div className='lg:h-64 flex flex-col md:flex-row md:items-center items-center'>
        <div className='p-4 text-center md:hidden'>
          <Icon size={48} className='text-blue-500' />
        </div>
        <div className='text-center p-4'>
          <h3 className='text-lg font-semibold mb-2'>{title}</h3>
          <p className='text-gray-700'>{description}</p>
        </div>
        <div className='hidden md:flex p-4 justify-center'>
          <Icon size={48} className='text-blue-500' />
        </div>
      </div>
    </div>
  )
}

const StartBlock: React.FC = () => {
  const [activeBlockIndex, setActiveBlockIndex] = useState(0)

  const handleBlockClick = (index: number) => {
    setActiveBlockIndex(index)
  }

  const buttonWidth = 100 / 3
  const activeButtonLeft = activeBlockIndex * buttonWidth * 3

  return (
    <div className='py-16 text-center max-w-4xl mx-auto'>
      <h2 className='text-3xl font-semibold mb-8'>С чего начать?</h2>
      <div className='flex justify-center relative w-full border-b-[7px] border-b-gray-100'>
        <button
          onClick={() => handleBlockClick(0)}
          className={`font-semibold text-lg focus:outline-none`}
          style={{ width: `${buttonWidth}%` }}
        >
          Создайте учебный план
        </button>
        <button
          onClick={() => handleBlockClick(1)}
          className={`font-semibold text-lg focus:outline-none`}
          style={{ width: `${buttonWidth}%` }}
        >
          Запишите видео
        </button>
        <button
          onClick={() => handleBlockClick(2)}
          className={`font-semibold text-lg focus:outline-none`}
          style={{ width: `${buttonWidth}%` }}
        >
          Запустите свой курс
        </button>
        <div
          className='absolute bottom-[-31%] left-0 border-b-gray-500 transition-all duration-300 border-b-[7px]'
          style={{
            width: `${buttonWidth}%`,
            transform: `translateX(${activeButtonLeft}%)`,
            height: '4px',
            borderRadius: '2px',
          }}
        />
      </div>
      <div className='flex mt-8 flex-col-reverse md:flex-row pr-2 pl-8 item-center'>
        <div className='flex-1 pr-4 text-gray-700 text-left text-lg'>
          {activeBlockIndex === 0 && (
            <>
              <p>
                Положитесь на свой интерес и знания. Выберите подходящую тему с помощью
                инструмента аналитики торговой площадки.
              </p>
              <p>
                Ваш стиль преподавания — то, что вы в него вкладываете, — зависит только
                от вас.
              </p>
              <h3 className='font-bold my-4 text-xl'>Нужна помощь?</h3>
              <p>
                Мы предоставляем множество ресурсов для создания вашего первого курса.
                Наши страницы с панелью преподавателя и учебным планом курса помогут вам
                организовать процесс.
              </p>
            </>
          )}

          {activeBlockIndex === 1 && (
            <>
              <p>
                Используйте простые устройства ― смартфон или цифровую зеркальную камеру,
                а также хороший микрофон ― этого достаточно.
              </p>
              <p>
                Если вы не любите быть в кадре, просто ведите запись экрана. В обоих
                случаях рекомендуемая длина видео для платных курсов составляет от двух
                часов.
              </p>
              <h3 className='font-bold my-4 text-xl'>Нужна помощь?</h3>
              <p>
                Наша команда поддержки всегда готова вам помочь и предоставить отзыв о
                вашем тестовом видео.
              </p>
            </>
          )}

          {activeBlockIndex === 2 && (
            <>
              <p>
                Получите свои первые оценки и отзывы, поделившись курсом в социальных
                сетях и в своей профессиональной среде.
              </p>
              <p>
                Ваш стиль преподавания — то, что вы в него вкладываете, — зависит только
                от вас.
              </p>
              <h3 className='font-bold my-4 text-xl'>Нужна помощь?</h3>
              <p>
                Наш инструмент для создания купонов позволит вам предлагать студентам
                поощрения за регистрацию, а участие в наших глобальных акциях поможет
                привлечь ещё больше студентов.
              </p>
            </>
          )}
        </div>
        <div className='pl-4 md:pl-0 md:w-[25%]'>
          {activeBlockIndex === 0 && (
            <div className='hidden md:block'>
              <img
                src={'https://s.udemycdn.com/teaching/plan-your-curriculum-v3.jpg'}
                alt={'launch-your-course'}
                className='lg:w-full h-auto md:hidden'
              />
            </div>
          )}
          {activeBlockIndex === 1 && (
            <div className='hidden md:block'>
              <img
                src={'https://s.udemycdn.com/teaching/record-your-video-v3.jpg'}
                alt={'launch-your-course'}
                className='w-full h-auto'
              />
            </div>
          )}
          {activeBlockIndex === 2 && (
            <div className='hidden md:block'>
              <img
                src={'https://s.udemycdn.com/teaching/launch-your-course-v3.jpg'}
                alt={'launch-your-course'}
                className='w-full h-auto'
              />
            </div>
          )}
        </div>
      </div>
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
          <NavLink to='/teaching/onboarding/teaching-experience'>
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
      <StartBlock />
      <div className='bg-gray-300 pb-10'>
        <div
          className='w-4/5 mx-auto bg-cover bg-center py-16 text-center text-black'
          style={{ backgroundImage: "url('your_image_url.jpg')" }}
        >
          <h1 className='text-3xl font-semibold mb-4'>
            Станьте преподавателем уже сегодня
          </h1>
          <p className='text-lg mb-8 text-gray-700'>
            Присоединяйтесь к нашей образовательной онлайн-платформе в мире!
          </p>
          <NavLink to='/teaching/onboarding/teaching-experience'>
            <button className='bg-black text-white px-16 py-4 hover:bg-gray-800'>
              Начать действовать
            </button>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default FirstTimeInstructorPage
