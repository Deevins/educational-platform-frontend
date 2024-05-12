import React, { useState } from 'react'
import video from '../../../public/videovideo.mp4'
import ReactPlayer from 'react-player'
import { NavLink } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'

interface CourseSection {
  id: number
  title: string
  duration: string
  items: CourseItem[]
}

interface CourseItem {
  id: number
  title: string
  type: 'lecture' | 'test' | 'reviews'
  duration: string
  videoUrl: string
}

const courseData: CourseSection[] = [
  {
    id: 1,
    title: 'Chapter 1: Writing Your Framework',
    duration: '4h 14m',
    items: [
      {
        id: 123,
        title: 'Part 1: Basic Framework Writing',
        type: 'lecture',
        duration: '1h 34m',
        videoUrl: 'https://youtu.be/6wbckQjhA4Y',
      },
      {
        id: 321,
        title: 'Part 2: User Interface Development',
        type: 'lecture',
        duration: '2h 40m',
        videoUrl: video,
      },
    ],
  },
  {
    id: 1,
    title: 'Chapter 1: Writing Your Framework',
    duration: '4h 14m',
    items: [
      {
        id: 123,
        title: 'Part 1: Basic Framework Writing',
        type: 'lecture',
        duration: '1h 34m',
        videoUrl: 'https://twitter.com/i/status/1789359851094614449',
      },
      {
        id: 321,
        title: 'Part 2: User Interface Development',
        type: 'lecture',
        duration: '2h 40m',
        videoUrl: video,
      },
    ],
  },
  {
    id: 1,
    title: 'Chapter 1: Writing Your Framework',
    duration: '4h 14m',
    items: [
      {
        id: 123,
        title: 'Part 1: Basic Framework Writing',
        type: 'lecture',
        duration: '1h 34m',
        videoUrl: video,
      },
      {
        id: 321,
        title: 'Part 2: User Interface Development',
        type: 'lecture',
        duration: '2h 40m',
        videoUrl: video,
      },
    ],
  },
  {
    id: 1,
    title: 'Chapter 1: Writing Your Framework',
    duration: '4h 14m',
    items: [
      {
        id: 123,
        title: 'Part 1: Basic Framework Writing',
        type: 'lecture',
        duration: '1h 34m',
        videoUrl: video,
      },
      {
        id: 321,
        title: 'Part 2: User Interface Development',
        type: 'lecture',
        duration: '2h 40m',
        videoUrl: video,
      },
    ],
  },
]

const CourseActivePage: React.FC = () => {
  const [openSections, setOpenSections] = useState<number[]>([])
  const [selectedItemIndex, setSelectedItemIndex] = useState<{
    section: number
    item: number
  } | null>(null)
  const [activeTab, setActiveTab] = useState<string>('overview')

  const toggleSection = (index: number) => {
    const currentIndex = openSections.indexOf(index)
    const newOpenSections = [...openSections]

    if (currentIndex === -1) {
      newOpenSections.push(index)
    } else {
      newOpenSections.splice(currentIndex, 1)
    }

    setOpenSections(newOpenSections)
  }

  const selectItem = (sectionIndex: number, itemIndex: number) => {
    setSelectedItemIndex({ section: sectionIndex, item: itemIndex })
  }
  return (
    <div className='flex flex-col ml-[16%] mt-[3%] '>
      <Header />
      <div className='flex w-full h-full'>
        <SectionList
          sections={courseData}
          toggleSection={toggleSection}
          selectItem={selectItem}
          openSections={openSections}
        />
        <div className='flex-1 p-5 flex flex-col items-center w-full'>
          <div className='flex flex-col items-center w-full min-h-screen bg-white shadow-md'>
            {selectedItemIndex ? (
              <>
                <VideoPlayer
                  url={
                    courseData[selectedItemIndex.section].items[selectedItemIndex.item]
                      .videoUrl
                  }
                />
                <div className='flex items-start flex-col w-full mb-8'>
                  <h1 className='text-3xl font-bold'>
                    {
                      courseData[selectedItemIndex.section].items[selectedItemIndex.item]
                        .title
                    }
                  </h1>
                  <p>
                    Вид занятия:{' '}
                    {courseData[selectedItemIndex.section].items[selectedItemIndex.item]
                      .type === 'lecture'
                      ? 'Лекция'
                      : 'Тест'}
                  </p>
                  <p>
                    Длительность занятия:{' '}
                    {
                      courseData[selectedItemIndex.section].items[selectedItemIndex.item]
                        .duration
                    }
                  </p>
                </div>
              </>
            ) : (
              <div className='flex justify-center items-center w-full h-full'>
                <h1 className='text-2xl font-bold'>
                  Пожалуйста, выберите лекцию или тест из списка слева.
                </h1>
              </div>
            )}
          </div>
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
          <DetailContent activeTab={activeTab} />
        </div>
      </div>
    </div>
  )
}

export default CourseActivePage

interface DetailContentProps {
  activeTab: string
}

const DetailContent: React.FC<DetailContentProps> = ({ activeTab }) => {
  const description =
    'Изучаем теорию PHP--->Пишем свой фреймворк--->Создаем CMS интернет-магазина-->Мастер веб-разработки на PHP'
  const levels = ['Новичок', 'Продвинутый', 'Гуру', 'Все уровни']
  const studentCount = 2128
  const lectures = 12
  const videoLength = '2h 30m'
  return (
    <div>
      {activeTab === 'overview' && (
        <div className='mt-4'>
          <div>
            <h2 className='text-xl font-bold mb-4'>Об этом курсе:</h2>
            <p className='mb-4'>{description}</p>
          </div>
          <div className='border-y-2 border-gray-300 flex flex-col md:flex-row min-h-32'>
            <h2 className='mr-4 md:mr-16 mt-4'>Подробные данные:</h2>
            <div className='mr-4 md:mr-16 mt-4 flex flex-col md:flex-row'>
              <ul className='flex flex-col'>
                <li>
                  <strong>Уровень навыков</strong>: {levels[0]}
                </li>
                <li>
                  <strong>Студентов</strong>: {studentCount}
                </li>
              </ul>
              <ul className='flex flex-col mt-4 md:mt-0 md:ml-8'>
                <li>
                  <strong>Лекций</strong>: {lectures}
                </li>
                <li>
                  <strong>Общая длина видео</strong>: {videoLength}
                </li>
              </ul>
            </div>
          </div>

          <div className='flex flex-col md:flex-row min-h-32 mt-4'>
            <h2 className='mr-4 md:mr-16'>
              <strong>Описание</strong>:
            </h2>
            <div className='mr-4 md:mr-16 flex flex-col'>
              {/* // TODO: Add description here via html */}
              13.04.2022 Вышло новое большое обновление курса! Включает в себя React 18й
              версии. Этот курс направлен на подробное изучение JavaScript без воды, но
              главное - немедленное применение его на практике. Это значит, что вы
              получите материал для работы и мы вместе будем создавать реальные проекты
              шаг за шагом. Вторая часть курса - это изучение самой популярной библиотеки
              на основе JavaScript - React.js со всеми необходимыми технологиями (в том
              числе и Redux) Для кого подойдет этот курс? Если вы ничего не знаете про
              программирование, но хотите начать Если вы новичок в JavaScript и хотите
              быстро его освоить и начать уже применять в работе Если вы начали своё
              обучение с JQuery или другого инструмента, но вам не хватает знаний основ
              Если вы хотите научить создавать web-приложения Если вы хотите освоить
              библиотеку React на реальных проектах Что внутри курса? Теория - это хорошо,
              но без практики результата не будет. Поэтому каждый теоретический блок
              заканчивается практикой, где вы будете писать приложение, интерактивные
              элементы на сайте и тд. Все материалы для работы будут предоставлены. На все
              вопросы внутри курса отвечаю лично как можно быстрее. Так же есть телеграм
              канал для вопросов и обсуждений. Все обновления курса бесплатны и в
              автоматическом режиме. мы изучим основы программирования и алгоритмов мы
              изучим основы объектно ориентированного программирования мы изучим основные
              концепции и принципы JavaScript, от самых простых до самых сложных мы
              научимся работать с такими популярными технологиями как AJAX, JSON и тд мы
              научимся работать с Git и GitHub мы научимся работать с npm, Babel,
              Browserify, Webpack, Heroku, Firebase и тд подумаем, какой фрэймворк или
              библиотеку выбрать в дальнейшем. Познакомимся с React, Angular, Vue, Jquery
              мы изучим библиотеку React и создадим 4 приложения на её основе мы изучим
              различные архитектурные подходы при построении web-приложений мы научимся
              работать с Redux и интегрировать этот инструмент в наши приложения
            </div>
          </div>

          <div className='mt-8 ml-4'>
            <h2>
              <strong>Чему вы научитесь:</strong>
            </h2>
            <ul className='list-disc pl-8 md:pl-32'>
              <li>Узнаете основы программирования и алгоритмов</li>
              <li>Узнаете основные концепции и принципы JavaScript</li>
              {/* Дополнительные пункты */}
            </ul>
            <h2 className='mt-6'>
              <strong>
                Существуют ли у курса какие-либо (предварительные) требования?
              </strong>
            </h2>
            <ul className='list-disc pl-8 md:pl-32'>
              <li>Базовые навыки HTML, CSS</li>
              <li>Любой редактор кода</li>
              {/* Дополнительные пункты */}
            </ul>
            <h2 className='mt-8'>
              <strong>Для кого этот курс:</strong>
            </h2>
            <ul className='list-disc pl-8 md:pl-32'>
              <li>Для тех, кто желает выучить JS с нуля</li>
              <li>Для тех, кто хочет применить знания на реальных проектах</li>
              {/* Дополнительные пункты */}
            </ul>
          </div>
        </div>
      )}
      {activeTab === 'reviews' && (
        <div className='mt-4 bg-amber-700'>
          <div className={'bg-amber-300'}>
            <ReviewsComponent />
          </div>
          <div className={'border-y-2 border-gray-300 flex min-h-32 '}>
            <h2 className={' mt-4'}>Подробные данные:</h2>
            <div className={'mr-16 mt-4  flex'}>
              <ul className={'flex flex-col'}>
                <li>
                  <strong>Уровень навыков</strong>: {levels[0]}
                </li>
                <li>
                  <strong>Студентов</strong>: {studentCount}
                </li>
              </ul>
            </div>
            <div className={' mt-4 flex'}>
              <ul className={'flex flex-col items-start'}>
                <li>
                  <strong>Лекций</strong>: {lectures}
                </li>
                <li>
                  <strong>Общая длина видео</strong>: {videoLength}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface CourseSection {
  title: string
  duration: string
  items: CourseItem[]
}

interface CourseItem {
  title: string
  type: 'lecture' | 'test' | 'reviews'
  duration: string
}

interface SectionListProps {
  sections: CourseSection[]
  toggleSection: (index: number) => void
  selectItem: (sectionIndex: number, itemIndex: number) => void
  openSections: number[]
}

const SectionList: React.FC<SectionListProps> = ({
  sections,
  toggleSection,
  selectItem,
  openSections,
}) => {
  return (
    <div className='w-2/12 bg-white text-black p-5 pt-2 overflow-y-auto shadow-2x fixed top-0 left-0 h-full mt-16'>
      {sections.map((section, idx) => (
        <div key={idx} className={'bg-gray-100 mb-2 overflow-hidden'}>
          <h3
            className='text-lg font-semibold cursor-pointer px-4 py-2 hover:bg-gray-200'
            onClick={() => toggleSection(idx)}
          >
            {section.title}
          </h3>
          {openSections.includes(idx) && (
            <ul className='list-disc pl-8 pr-4 pb-4 bg-gray-50'>
              {section.items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className='cursor-pointer py-1 hover:bg-gray-100'
                  onClick={() => selectItem(idx, itemIdx)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

interface VideoPlayerProps {
  url: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  return (
    <div className={'sm:w-full h-[80%] 2xl:w-[70%] 2xl:h-[90%]'}>
      <ReactPlayer url={url} width='100%' height={'100%'} controls={true} />
    </div>
  )
}

interface NavbarProps {
  activeTab: string
  setActiveTab: (tabName: string) => void
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className='flex border-b w-full'>
      <button
        className={`p-2 ${activeTab === 'overview' ? 'font-bold border-b-black border-b-2' : ''}`}
        onClick={() => setActiveTab('overview')}
      >
        Обзор
      </button>
      {/*<button*/}
      {/*  className={`p-2 ${activeTab === 'details' ? 'font-bold border-b-black border-b-2' : ''}`}*/}
      {/*  onClick={() => setActiveTab('details')}*/}
      {/*>*/}
      {/*  Вопросы и ответы*/}
      {/*</button>*/}
      {/*<button*/}
      {/*  className={`p-2 ${activeTab === 'tests' ? 'font-bold border-b-black border-b-2' : ''}`}*/}
      {/*  onClick={() => setActiveTab('tests')}*/}
      {/*>*/}
      {/*  Tests*/}
      {/*</button>*/}
      <button
        className={`p-2 ${activeTab === 'reviews' ? 'font-bold border-b-black border-b-2' : ''}`}
        onClick={() => setActiveTab('reviews')}
      >
        Отзывы
      </button>
    </div>
  )
}
const Header: React.FC = () => {
  return (
    <div className='bg-gray-800 text-white h-16 flex items-center px-4 fixed top-0 left-0 w-full'>
      <NavLink to={'/'} className='hidden lg:flex md:flex items-center sm:hidden h-8'>
        <Avatar className={'hover:scale-105 '}>
          <AvatarImage src={'https://flowbite.com/docs/images/logo.svg'} />
          <AvatarFallback>Логотип</AvatarFallback>
        </Avatar>
        <h1 className='text-lg font-bold ml-6'>ProdigyPath Education</h1>
      </NavLink>
    </div>
  )
}

export const ReviewsComponent: React.FC = () => {
  const ratingsDistribution = computeRatingDistribution(reviews)
  const avgRating = averageRating(reviews)

  return (
    <div className='max-w-8xl p-6 bg-white rounded-lg shadow w-full'>
      <h2 className='text-2xl font-bold mb-4'>Отзывы студентов</h2>
      <RatingSummary averageRating={avgRating} distribution={ratingsDistribution} />
      <ReviewList reviews={reviews} />
    </div>
  )
}

interface Review {
  id: number
  name: string
  date: string
  content: string
  rating: number
}

const reviews: Review[] = [
  // Example reviews
  {
    id: 1,
    name: 'Myroslava S.',
    date: '8 months ago',
    content: 'Хороший курс! Точно.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Mikhail',
    date: '8 months ago',
    content: 'Всё предельно понятно',
    rating: 5,
  },
  {
    id: 3,
    name: 'Юрий Сергеевич',
    date: '2 years ago',
    content: 'Спасибо за курс! Очень понравился...',
    rating: 4,
  },
  {
    id: 4,
    name: 'Myroslava S.',
    date: '8 months ago',
    content: 'Хороший курс! Точно.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Mikhail',
    date: '8 months ago',
    content: 'Всё предельно понятно',
    rating: 5,
  },
  {
    id: 6,
    name: 'Юрий Сергеевич',
    date: '2 years ago',
    content: 'Спасибо за курс! Очень понравился...',
    rating: 4,
  },
  {
    id: 7,
    name: 'Myroslava S.',
    date: '8 months ago',
    content: 'Хороший курс! Точно.',
    rating: 5,
  },
  {
    id: 8,
    name: 'Mikhail',
    date: '8 months ago',
    content: 'Всё предельно понятно',
    rating: 5,
  },
  {
    id: 9,
    name: 'Юрий Сергеевич',
    date: '2 years ago',
    content: 'Спасибо за курс! Очень понравился...',
    rating: 4,
  },
  {
    id: 11,
    name: 'Myroslava S.',
    date: '8 months ago',
    content: 'Хороший курс! Точно.',
    rating: 5,
  },
  {
    id: 13,
    name: 'Mikhail',
    date: '8 months ago',
    content: 'Всё предельно понятно',
    rating: 5,
  },
  {
    id: 14,
    name: 'Юрий Сергеевич',
    date: '2 years ago',
    content: 'Спасибо за курс! Очень понравился...',
    rating: 4,
  },
]

const computeRatingDistribution = (reviews: Review[]) => {
  const total = reviews.length
  const countPerStar = Array(5).fill(0) // Five star rating system

  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      countPerStar[review.rating - 1]++
    }
  })

  const percentages = countPerStar.map((count) => (count / total) * 100)
  return percentages.reverse() // Since we want 5-stars first
}

const averageRating = (reviews: Review[]) => {
  const total = reviews.reduce((acc, review) => acc + review.rating, 0)
  return (total / reviews.length).toFixed(1)
}

interface ReviewListProps {
  reviews: Review[]
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  const [visibleCount, setVisibleCount] = useState(10)

  const loadMoreReviews = () => {
    setVisibleCount((currentCount) => currentCount + 10)
  }

  return (
    <div>
      {reviews.slice(0, visibleCount).map((review) => (
        <div key={review.id} className='mb-4 p-4 border-b last:border-b-0'>
          <div className='flex items-center space-x-4'>
            <div className='font-semibold'>{review.name}</div>
            <div className='text-gray-500 text-sm'>{review.date}</div>
          </div>
          <div className='flex items-center mt-1'>
            <div className='text-yellow-400'>
              {Array(review.rating).fill('★').join('')}
            </div>
            <div className='text-sm text-gray-500 ml-2'>{review.rating.toFixed(1)}</div>
          </div>
          <p className='mt-2 text-gray-800'>{review.content}</p>
        </div>
      ))}
      <div className={'flex items-center justify-center'}>
        {visibleCount < reviews.length && (
          <button
            onClick={loadMoreReviews}
            className='mt-4 px-6 py-2 text-black border-2 border-black  transition duration-300'
          >
            Load More Reviews
          </button>
        )}
      </div>
    </div>
  )
}

interface RatingSummaryProps {
  averageRating: string
  distribution: number[] // This expects an array of percentages for 5 to 1 stars
}

const RatingSummary: React.FC<RatingSummaryProps> = ({ averageRating, distribution }) => {
  return (
    <div className='mb-6 '>
      <div className='flex items-center mb-4'>
        <div className='text-4xl font-bold mr-4'>{averageRating}</div>
        <div className='w-full'>
          {distribution.map((percent, index) => (
            <div key={index} className='flex items-center mb-1'>
              <div className='w-8 text-right'>{5 - index}★</div>
              <div className='w-full bg-gray-200 rounded overflow-hidden ml-2'>
                <div className='bg-yellow-400 h-2' style={{ width: `${percent}%` }}></div>
              </div>
              <div className='ml-2 text-sm'>{percent.toFixed(0)}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
