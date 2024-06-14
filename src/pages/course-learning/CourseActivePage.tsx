import React, { useState } from 'react'
import video from '/videovideo.mp4'
import ReactPlayer from 'react-player'
import { NavLink } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import TestSection from '@/pages/course-learning/TestSection.tsx'
import { TestQuestion } from '@/pages/course-creation/curriculum/types.ts'
import logo from '/platform_logo.png'
import {
  averageRating,
  computeRatingDistribution,
  Review,
  ReviewList,
} from '@/components/ReviewList.tsx'

interface CourseSection {
  id: number
  title: string
  duration: string
  lectures: Lecture[]
  tests: Test[]
}

interface Lecture {
  id: number
  title: string
  duration: string
  description?: string
  videoUrl: string
}

interface Test {
  id: number
  title: string
  isAlreadyPassed: boolean
  attempts: number
}

// Sample data for courses, including lectures and tests
const courseData: CourseSection[] = [
  {
    id: 1,
    title: 'Секция 1: Frontend - разработка',
    duration: '2h 14m',
    lectures: [
      {
        id: 123,
        title: 'Лекция 1: Начало!',
        duration: '1h 34m',
        videoUrl: 'https://youtu.be/gb7gMluAeao?list=PLcvhF2Wqh7DNVy1OCUpG3i5lyxyBWhGZ8',
        description:
          'В данной лекции мы начнём наше погружение в мир интерфейсов и разработки адаптивных дизайнов.',
      },
      {
        id: 321,
        title: 'Лекция 2: Продолжение',
        duration: '2h 40m',
        videoUrl: video,
        description:
          'In this lecture, we will cover the basics of writing a framework from scratch. We will discuss the core concepts and how to structure your codebase.',
      },
    ],
    tests: [
      {
        id: 456,
        attempts: 2,
        isAlreadyPassed: false,
        title: 'Тест по пройденному материалу',
      },
    ],
  },
  {
    id: 1,
    title: 'Секция 2: Занимаемся бэкендом',
    duration: '4h 14m',
    lectures: [
      {
        id: 123,
        title: 'Part 1: Basic Framework Writing',
        duration: '1h 34m',
        videoUrl: 'https://youtu.be/6wbckQjhA4Y',
        description:
          'In this lecture, we will cover the basics of writing a framework from scratch. We will discuss the core concepts and how to structure your codebase.',
      },
      {
        id: 321,
        title: 'Part 2: User Interface Development',
        duration: '2h 40m',
        videoUrl: video,
        description:
          'In this lecture, we will cover the basics of writing a framework from scratch. We will discuss the core concepts and how to structure your codebase.',
      },
    ],
    tests: [
      {
        id: 456,
        attempts: 2,
        isAlreadyPassed: false,
        title: 'Framework Basics Test',
      },
    ],
  },
]

const questions: TestQuestion[] = [
  {
    question: 'Question 1: What is React?',
    answers: [
      {
        answer: 'Library',
        answerIsCorrect: true,
        answerDescription: 'React is a JavaScript library for building user interfaces.',
      },
      {
        answer: 'Framework',
        answerIsCorrect: false,
        answerDescription: "React is not considered a framework; it's a library.",
      },
      {
        answer: 'Application',
        answerIsCorrect: false,
        answerDescription:
          'React is used to build applications, not an application itself.',
      },
      {
        answer: 'Language',
        answerIsCorrect: false,
        answerDescription: 'React is a library, not a programming language.',
      },
    ],
  },
  {
    question: 'Question 2: What is useState used for in React?',
    answers: [
      {
        answer: 'State management',
        answerIsCorrect: true,
        answerDescription:
          'useState is a Hook that allows you to have state variables in functional components.',
      },
      {
        answer: 'Data fetching',
        answerIsCorrect: false,
        answerDescription:
          'Data fetching is typically handled by other means like useEffect or dedicated libraries.',
      },
      {
        answer: 'Performing calculations',
        answerIsCorrect: false,
        answerDescription:
          'Calculations can be done directly in the component or useEffect.',
      },
      {
        answer: 'None of the above',
        answerIsCorrect: false,
        answerDescription:
          'useState is specifically used for state management in functional components.',
      },
    ],
  },
]

const CourseActivePage: React.FC = () => {
  const [openSections, setOpenSections] = useState<number[]>([])
  const [selectedItem, setSelectedItem] = useState<{
    section: number
    type: 'lecture' | 'test'
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

  const selectItem = (
    sectionIndex: number,
    itemType: 'lecture' | 'test',
    itemIndex: number
  ) => {
    setSelectedItem({ section: sectionIndex, type: itemType, item: itemIndex })
  }

  return (
    <div className='flex flex-col ml-[15%] mt-[3%]'>
      <Header />
      <div className='flex w-full h-full'>
        <SectionList
          sections={courseData}
          toggleSection={toggleSection}
          selectItem={selectItem}
          openSections={openSections}
        />
        <div className='flex-1 p-5 flex flex-col items-center w-full ml-[7%]'>
          <div className='flex flex-col items-center w-full min-h-screen bg-white shadow-md'>
            {selectedItem ? (
              selectedItem.type === 'lecture' ? (
                <LectureComponent
                  lecture={courseData[selectedItem.section].lectures[selectedItem.item]}
                />
              ) : (
                <TestSection questions={questions} />
              )
            ) : (
              <div className='flex justify-center items-center w-full h-full'>
                <h1 className='text-2xl font-bold'>
                  Выберите секцию с левой стороны страница для начала обучения.
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
    <div className={' w-full '}>
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

          <div className='flex flex-col md:flex-row min-h-8 mt-4'>
            <h2 className='ml-8 md:mr-16'>
              <strong>Описание</strong>:
            </h2>
          </div>
          <div className='mr-4 md:mr-16 flex flex-col  ml-36'>
            {/* // TODO: Add description here via html */}
            13.04.2022 Вышло новое большое обновление курса! Включает в себя React 18й
            версии. Этот курс направлен на подробное изучение JavaScript без воды, но
            главное - немедленное применение его на практике. Это значит, что вы получите
            материал для работы и мы вместе будем создавать реальные проекты шаг за шагом.
            Вторая часть курса - это изучение самой популярной библиотеки на основе
            JavaScript - React.js со всеми необходимыми технологиями (в том числе и Redux)
            Для кого подойдет этот курс? Если вы ничего не знаете про программирование, но
            хотите начать Если вы новичок в JavaScript и хотите быстро его освоить и
            начать уже применять в работе Если вы начали своё обучение с JQuery или
            другого инструмента, но вам не хватает знаний основ Если вы хотите научить
            создавать web-приложения Если вы хотите освоить библиотеку React на реальных
            проектах Что внутри курса? Теория - это хорошо, но без практики результата не
            будет. Поэтому каждый теоретический блок заканчивается практикой, где вы
            будете писать приложение, интерактивные элементы на сайте и тд. Все материалы
            для работы будут предоставлены. На все вопросы внутри курса отвечаю лично как
            можно быстрее. Так же есть телеграм канал для вопросов и обсуждений. Все
            обновления курса бесплатны и в автоматическом режиме. мы изучим основы
            программирования и алгоритмов мы изучим основы объектно ориентированного
            программирования мы изучим основные концепции и принципы JavaScript, от самых
            простых до самых сложных мы научимся работать с такими популярными
            технологиями как AJAX, JSON и тд мы научимся работать с Git и GitHub мы
            научимся работать с npm, Babel, Browserify, Webpack, Heroku, Firebase и тд
            подумаем, какой фрэймворк или библиотеку выбрать в дальнейшем. Познакомимся с
            React, Angular, Vue, Jquery мы изучим библиотеку React и создадим 4 приложения
            на её основе мы изучим различные архитектурные подходы при построении
            web-приложений мы научимся работать с Redux и интегрировать этот инструмент в
            наши приложения
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
        <div className='mt-4 w-full '>
          <ReviewList reviews={initialReviews} /> {/* TODO: wtf*/}
        </div>
      )}
    </div>
  )
}

interface SectionListProps {
  sections: CourseSection[]
  toggleSection: (index: number) => void
  selectItem: (
    sectionIndex: number,
    itemType: 'lecture' | 'test',
    itemIndex: number
  ) => void
  openSections: number[]
}

const SectionList: React.FC<SectionListProps> = ({
  sections,
  toggleSection,
  selectItem,
  openSections,
}) => {
  return (
    <div className='w-2/12 bg-white text-black p-5 pt-2 overflow-y-auto shadow-2xl fixed top-0 left-0 h-full mt-16'>
      {sections.map((section, idx) => (
        <div key={idx} className='bg-gray-100 mb-2 overflow-hidden py-2'>
          <h3
            className='text-lg font-semibold cursor-pointer px-4 py-2 hover:bg-gray-200'
            onClick={() => toggleSection(idx)}
          >
            {section.title}
          </h3>
          {openSections.includes(idx) && (
            <ul className='list-disc pl-8 pr-4 pb-4 bg-gray-50'>
              {section.lectures.map((lecture, lectureIdx) => (
                <li
                  key={lectureIdx}
                  className='cursor-pointer py-1 hover:bg-gray-100'
                  onClick={() => selectItem(idx, 'lecture', lectureIdx)}
                >
                  {lecture.title}
                </li>
              ))}
              {section.tests.map((test, testIdx) => (
                <li
                  key={testIdx}
                  className='cursor-pointer py-1 hover:bg-gray-100'
                  onClick={() => selectItem(idx, 'test', testIdx)}
                >
                  {test.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

interface LectureComponentProps {
  lecture: Lecture
}

const LectureComponent: React.FC<LectureComponentProps> = ({ lecture }) => {
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseOver = () => setIsHovering(true)
  const handleMouseOut = () => setIsHovering(false)

  return (
    <div className='flex flex-col items-center w-full min-h-screen bg-white shadow-md p-5'>
      <h1 className='text-3xl font-bold'>{lecture.title}</h1>
      <p>Длительность лекции: {lecture.duration}</p>
      <VideoPlayer url={lecture.videoUrl} />
      <div className='flex items-start flex-col truncate max-w-7xl max-h-7xl mx-16 lg:ml-52 xl:ml-0'>
        <p className='text-xl'>
          <strong>Подробности лекции:</strong>
        </p>
        <p
          className='truncate overflow-hidden text-justify'
          style={{ maxHeight: '96px', lineHeight: '24px' }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {lecture.description}
        </p>
        {isHovering && (
          <div
            className='absolute bg-white border border-gray-300 p-2 rounded shadow-lg z-50'
            style={{ maxHeight: '200px', overflowY: 'auto' }}
          >
            {lecture.description}
          </div>
        )}
      </div>
    </div>
  )
}

interface VideoPlayerProps {
  url: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  return (
    <div className={'sm:w-full w-[60%] h-[80%] 2xl:w-[70%] 2xl:h-[60%]'}>
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
          <AvatarImage src={logo} />
          <AvatarFallback>Логотип</AvatarFallback>
        </Avatar>
        <h1 className='text-lg font-bold ml-6'>ProdigyPath</h1>
      </NavLink>
    </div>
  )
}

const initialReviews: Review[] = [
  {
    full_name: 'John Doe',
    review_text: 'Great course!',
    created_at: '2023-05-01',
    rating: 5,
  },
  {
    full_name: 'Jane Smith',
    review_text:
      'Learned a lot, highly recommendLearned a lot, highly recommendLearned a lot, highly recommendLearned a lot, highly recommendLearned a lot, highly recommendLearned a lot, highly recommendLearned a lot, highly recommendLearned a lot, highly recommendLearned a lot, highly recommendLearned a lot, highly recommendLearned a lot, highly recommendLearned a lot, highly recommendLearned a lot, highly recommendLearned a lot, highly recommendLearned a lot, highly recommendLearned a lot, highly recommendLearned a lot, highly recommend!',
    created_at: '2023-05-02',
    rating: 4,
  },
]

export const ReviewsComponent: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [newReview, setNewReview] = useState<Review>({
    full_name: '',
    review_text: '',
    created_at: '',
    rating: 0,
  })

  const ratingsDistribution = computeRatingDistribution(reviews)
  const avgRating = averageRating(reviews)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setNewReview((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const reviewToAdd = {
      ...newReview,
      date: new Date().toISOString().split('T')[0],
    }
    setReviews([...reviews, reviewToAdd])
    setNewReview({ full_name: '', review_text: '', created_at: '', rating: 0 })
  }

  return (
    <div className='max-w-8xl p-6 bg-white shadow w-full'>
      <h2 className='text-2xl font-bold mb-4'>Отзывы студентов</h2>
      <RatingSummary averageRating={avgRating} distribution={ratingsDistribution} />
      <ReviewList reviews={reviews} />
      <form
        onSubmit={handleSubmit}
        className='bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mt-6'
      >
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='author'>
            Автор
          </label>
          <input
            id='author'
            name='author'
            type='text'
            value={newReview.full_name}
            onChange={handleInputChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Ваше имя'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='content'>
            Отзыв
          </label>
          <textarea
            id='content'
            name='content'
            value={newReview.review_text}
            onChange={handleInputChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Ваш отзыв'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
            Ваше имя
          </label>
          <input
            id='name'
            name='name'
            type='text'
            disabled={true}
            value={newReview.full_name}
            onChange={handleInputChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Имя'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='rating'>
            Рейтинг
          </label>
          <input
            id='rating'
            name='rating'
            type='number'
            value={newReview.rating}
            onChange={handleInputChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Рейтинг от 1 до 5'
            min='1'
            max='5'
            required
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Отправить
          </button>
        </div>
      </form>
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
