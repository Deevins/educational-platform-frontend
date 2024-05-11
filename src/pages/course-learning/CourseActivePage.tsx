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
    <div className={'ml-[20%] mt-[3%]'}>
      <Header />
      <div className='flex max-h-screen'>
        <SectionList
          sections={courseData}
          toggleSection={toggleSection}
          selectItem={selectItem}
          openSections={openSections}
        />
        <div className='flex-1 p-5 flex flex-col items-center min-h-screen'>
          {selectedItemIndex !== null && selectedItemIndex !== null ? (
            <>
              <VideoPlayer
                url={
                  courseData[selectedItemIndex.section].items[selectedItemIndex.item]
                    .videoUrl
                }
              />
              <div className={'flex items-start flex-col w-full mb-8'}>
                <h1 className='text-2xl font-bold'>
                  {
                    courseData[selectedItemIndex.section].items[selectedItemIndex.item]
                      .title
                  }
                </h1>
                <div>
                  <p className={'flex items-start'}>
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
              </div>
            </>
          ) : (
            <div className={'flex justify-center my-auto min-h-[80%] items-center'}>
              <h1 className='text-xl font-bold'>
                Пожалуйста выберите лекцию или тест из списка слева.
              </h1>
            </div>
          )}
          <div className={'flex items-start flex-col ml-[17%]'}>
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
            <DetailContent activeTab={activeTab} />
          </div>
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
            <p className={'mb-4'}>{description}</p>
          </div>
          <div className={'border-y-2 border-gray-300 flex min-h-32 '}>
            <h2 className={'mr-16 mt-4'}>Подробные данные:</h2>
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

          <div className={'border-y-2 border-gray-300 flex min-h-32 '}>
            <h2 className={'mr-16 mt-4'}>
              <strong>Описание</strong>:
            </h2>
            <div className={'mr-16 mt-4 flex'}>
              Изучаем теорию PHP Пишем свой фреймворк Создаем CMS интернет-магазина Мастер
              веб-разработки на PHP Полный новичок в веб-программировании Вы хотите
              изучить с полного нуля язык PHP для разработки сайтов и веб-приложений. Но у
              вас все еще нет понимания, что такое и для чего нужны PHP и MySQL. И тем
              более как они работают вместе. Начинающий веб-разработчик Вы уже сделали
              первые шаги в веб-разработке, но ваших знаний часто не хватает для того,
              чтобы понять, что происходит на этапе программирования сайта. Испытываете
              сложности с написанием скриптов. Вы уже изучали PHP и MySQL Знания у вас
              есть, а применить их никак не получается. Потому что знания по PHP и MySQL
              могут и быть, но затруднение вызывает именно сама разработка, сам процесс
              написание цельного рабочего кода. Опытный разработчик У вас уже немаленький
              опыт и вы владеете основами PHP и MySQL, но вы хотите как можно меньше
              времени тратить на написание повторяющегося кода. Вам необходимо обновить
              свои знания и автоматизировать свою работу. Если вы попали в одну из этих
              категорий, возможно, вам будет полезно прочитать содержимое этой страницы
              очень внимательно! Что такое PHP, и для чего он нужен? PHP — самый
              популярный язык программирования среди веб-разработчиков в мире. Абсолютное
              большинство всех сайтов в интернете написаны на PHP. PHP является скриптовым
              серверным языком. Это значит, что все скрипты, написанные на этом языке,
              выполняются на локальном либо удаленном сервере с сайтом (сфера
              backend-разработки). Язык PHP поддерживается и разрабатывается как проект с
              открытым исходным кодом, имеющий тысячи участников, активно работающих над
              развитием языка, чтобы удовлетворить потребности современной веб-разработки.
              PHP продолжает включать в себя новые идеи программирования и заимствует идеи
              из других языков программирования, сохраняя при этом высокий уровень
              обратной совместимости. Эти качества обеспечили языку PHP его нынешнее
              выдающееся положение. WebForMySelf представляет фундаментальный практический
              видеокурс "PHP-Мастер. От теории до собственной CMS интернет-магазина".
              Основная часть курса включает 85 уроков общей продолжительностью почти 30
              часов: Часть 1. Написание собственного фреймворка Часть 2. Написание
              пользовательской части CMS интернет-магазина Часть 3. Написание
              администраторской части CMS интернет-магазина Бонусный блок курса состоит из
              6 абсолютно новых актуальных видеокурсов и серий уроков, созданных с полного
              нуля и нигде не встречавшихся до этого: Бонус 1. Перенос сайта на хостинг
              Бонус 2. Подключение платежной системы Бонус 3. Личный кабинет покупателя
              Бонус 4. Канонические URL Бонус 5. Премиум курс по PHP+PHP 7 и MySQL Бонус
              6. Премиум курс по ООП PHP При этом 5 и 6 бонусы являются фундаментальными,
              новаторскими и исчерпывающими по своему объему, содержанию и структуре
              видеокурсами, раскрывающих всю суть программирования на актуальных версиях
              РНР и MySQL, включая основы объектно-ориентированного программирования. Даже
              самый «зеленый» новичок сможет разобраться с курсом и освоить
              веб-программирование на PHP и MySQL. Все необходимые для этого
              дополнительные курсы входят бонусами к основному курсу. Поэтому новичкам
              прямая дорога к бонусной части! Что вы получите, приобретая данный курс
              Краткий ответ можно дать в двух словах – КОМПЛЕКСНОСТЬ и ПРАКТИКА. Курс
              имеет именно практическую направленность. А бонусы к курсу – закрывают
              полностью всю необходимую теоретическую базу. Как итог, исчерпывающий
              видеокурс! АВТОМАТИЗАЦИЯ И УСКОРЕНИЕ РАБОТЫ В этом уникальном видеокурсе
              показано не только создание движка для интернет-магазина, но еще и создается
              собственный фреймворк, на котором и пишется CMS. В курсе разрабатывается
              собственный РНР-фреймворк, который вы сможете в дальнейшем использовать
              многократно, сокращая время разработки. По итогам прохождения курса вы
              создадите уже готовую CMS для интернет-магазина и сможете разрабатывать на
              заказ интернет-магазины и другие типы сайтов, используя разработанную в
              курсе CMS. БЕСЦЕННЫЙ ОПЫТ И ПОРТФОЛИО В практической части видеокурса шаг за
              шагом создается с полного нуля интернет-магазин с широким функционалом,
              который и будет вашей первой работой на РНР в будущем портфолио. И если вы
              освоите разработку интернет-магазина, то после этого вам не составит труда
              разработать любой другой вид сайта: сайт-визитку, корпоративный сайт, блог,
              новостной портал и т.д. Результат практической части По итогам курса мы
              создадим с вами полностью готовый и настроенный функциональный современный
              интернет-магазин. Итоговый функционал CMS интернет-магазина Вот основная
              часть функционала CMS интернет-магазина, который мы создадим в курсе:
              Категории товаров с неограниченным уровнем вложенности Товары и модификации
              товаров Корзина с возможностью добавления товара без перезагрузки страницы
              Мультивалютность и возможность добавления новых валют Модуль связанных
              товаров (с этим товаром также покупают) Модуль просмотренных товаров Живой
              поиск по товарам Регистрация и авторизация покупателя Личный кабинет
              покупателя Оформление заказа и онлайн оплата Фильтры товаров Постраничная
              навигация для товаров Хлебные крошки Администраторская часть для управления
              магазином На что вы можете рассчитывать Если вы новичок... Если вы только
              делаете первые шаги в веб-разработке и у вас нет теоретической базы, то
              данный курс подойдет для вас идеально – вы получите комплексные, четкие,
              структурированные знания по PHP и MySQL. В курсе знания даются системно и
              последовательно, от простого к сложному. Курс даст вам исчерпывающую
              теоретическую базу, закрывающую все пробелы в знаниях. Ну и, конечно, море
              практики! В результате у вас будет полное понимание PHP и MySQL и вы сможете
              сразу же применять их на практике при программировании веб-сайтов
              практически любой сложности. Изучив курс, вы увидите и поймете, как
              происходит разработка скриптов и создание CMS будущего интернет-магазина. И
              самое главное – как это делать правильно. Всем новичкам необходимо начать
              изучение курса с бонусного блока, в котором содержится ВСЯ теоретическая
              база по PHP и MySQL для старта с полного нуля. Если вы действующий
              разработчик... Если вы уже постигли теорию, но на практике не понимаете, как
              связать все воедино и построить веб-приложение – тогда данный курс поможет
              вам значительно сократить затраты времени на написание повторяющегося кода.
              Вы сможете обновить разрозненные знания и автоматизировать вашу работу путем
              создания собственного PHP-фреймворка. Данный курс может стать для вас именно
              тем самым рывком вперед, который покажет, как перейти от теории к практике
              создания динамических веб-приложений. Благодаря знаниям, полученным из
              уроков курса, вы не только сможете создать собственную CMS, заточенную под
              создание интернет-магазинов (одного из наиболее востребованных и
              функциональных видов веб-приложений), но и напишете собственный
              PHP-фреймворк, на базе которого и будет создана CMS. А разобравшись с
              программированием интернет-магазина, вы будете в состоянии создавать сайты
              практически любой сложности! Рынок остро нуждается в РНР-разработчиках
              Учитывая популярность PHP, российский рынок сайтостроения вот уже много лет
              испытывает постоянный высокий спрос на PHP-программистов, особенно высокого
              уровня. Имея знания по PHP и умея программировать на этом языке, вы
              гарантированно откроете для себя новые возможности для заработка и
              стремительного карьерного роста. Если вы еще сомневаетесь, просто зайдите на
              любой сайт по поиску работы и посмотрите количество вакансий по запросу
              «PHP». На рынке IT существует огромная нехватка программистов на PHP. И,
              приложив усилия, вы можете легко влиться в эту струю IT, и обеспечить себе
              дорогу в мир больших заработков, а наш курс и личная поддержка
              автора-наставника очень облегчат вам этот путь. В данном курсе мы построили
              программу таким образом, чтобы ученик был полностью подготовлен к работе с
              реальными проектами, которые предлагают IT-работодатели, а также смог
              продемонстрировать владение языком РНР на уровне не ниже Junior Backend
              Developer.
            </div>
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
      <button
        className={`p-2 ${activeTab === 'details' ? 'font-bold border-b-black border-b-2' : ''}`}
        onClick={() => setActiveTab('details')}
      >
        Вопросы и ответы
      </button>
      <button
        className={`p-2 ${activeTab === 'tests' ? 'font-bold border-b-black border-b-2' : ''}`}
        onClick={() => setActiveTab('tests')}
      >
        {/*reviews*/}
        Tests
      </button>
      <button
        className={`p-2 ${activeTab === 'reviews' ? 'font-bold border-b-black border-b-2' : ''}`}
        onClick={() => setActiveTab('reviews')}
      >
        reviews
      </button>
      {/* Добавьте дополнительные кнопки по необходимости */}
    </div>
  )
}
const Header: React.FC = () => {
  return (
    <div className='bg-gray-800 text-white h-16 flex items-center px-4 fixed top-0 left-0 w-full'>
      {/* Высота, цвет фона и отступы можно настроить */}
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
