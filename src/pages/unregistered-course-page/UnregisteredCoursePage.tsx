import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import video from '/videovideo.mp4'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { GoVideo } from 'react-icons/go'
import { Link, NavLink } from 'react-router-dom'
import { LearnComponent } from '@/pages/unregistered-course-page/LearnComponent.tsx'
import { MaterialsComponent } from '@/pages/unregistered-course-page/MaterialsComponent.tsx'
import { ReviewsComponent } from '@/pages/unregistered-course-page/ReviewsComponent.tsx'
import { InstructorComponent } from '@/pages/unregistered-course-page/InstructorComponent.tsx'

const instructorObject = {
  id: 1,
  name: 'Иван Иванов',
  avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  rating: 4.9,
  totalRatings: 606,
  studentsCount: 6453,
  description:
    'Иван Иванов - опытный разработчик, который работает в индустрии более 10 лет. Он специализируется на создании веб-приложений с использованием современных технологий.',
}

const UnregisteredCoursePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('learn')
  const studentsCount = 6453
  const instuctorUrl = ''
  const isStudentRegistered = false

  const renderContent = () => {
    switch (activeSection) {
      case 'learn':
        return <LearnComponent />
      case 'materials':
        return <MaterialsComponent />
      case 'reviews':
        return <ReviewsComponent />
      case 'instructor':
        return (
          <InstructorComponent
            name='Евгений Волосатов'
            title='Магистр математики и информатики, C#, Java, PHP программист'
            rating={4.4}
            reviewCount={859}
            studentCount={9420}
            courseCount={13}
            description='Я — Игромистр. Моё призвание — показать понятный процесс создания игровых и прикладных программ, с нуля до результата.'
          />
        )
      default:
        return <LearnComponent />
    }
  }

  const handleRegisterOnCourse = () => {
    console.log('Register on course')
    // TODO: Implement registration on course functionality and redirect if successful
  }

  return (
    <div className={'lg:w-full min-h-screen'}>
      <div className='bg-white p-5 flex lg:items-center flex-col '>
        <div className='flex mb-5'>
          {/*<div className='flex-col lg:flex lg:items-center w-full'> FIXME: adaptiv snizy*/}
          <div className='flex '>
            <ReactPlayer url={video} controls={true} />
            <div className={'ml-6'}>
              <h1 className='text-3xl font-bold text-gray-900 max-w-2xl truncate mb-4'>
                Обзор Frontend и Backend технологий
              </h1>
              <div className={'flex flex-col justify-center'}>
                <p className='text-xl text-gray-700 max-w-4xl truncate hover:text-clip mb-4'>
                  Создание нано-проекта с использованием основных Web-технологий
                </p>
                <div className={'flex text-center items-center'}>
                  <RatingComponent rating={4.9} totalRatings={606} />
                  <p className={'ml-auto'}>{studentsCount} студентов</p>
                </div>
                <p className={'flex items-center text-center'}>
                  <GoVideo className={'mr-2 mt-0.5'} />
                  1ч 15 мин видеоматериала лекций
                </p>
                <p>
                  Автор:{' '}
                  <NavLink
                    to={instuctorUrl}
                    className={'hover:text-blue-500 text-purple-700'}
                  >
                    {instructorObject.name}
                  </NavLink>
                </p>
              </div>
              {isStudentRegistered ? (
                <Link to={''}>
                  <button
                    className={
                      'bg-black text-white py-2 w-full lg:mt-[23%] hover:bg-gray-800'
                    }
                    onClick={handleRegisterOnCourse}
                  >
                    Перейти к курсу
                  </button>
                </Link>
              ) : (
                <Link to={'/courses/course/:courseID/learn/lecture/15154208'}>
                  <button
                    className={
                      'bg-black text-white py-2 w-full lg:mt-[23%] hover:bg-gray-800'
                    }
                  >
                    {' '}
                    isInstuctor Зарегистрироваться
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='ml-[17%] w-[68%] px-6 flex flex-col  mb-8 '>
        <div className={'flex border-b-2 mb-4'}>
          <button
            className={`px-4 py-2 ${activeSection === 'learn' ? 'text-black border-b-2 border-black' : ''}`}
            onClick={() => setActiveSection('learn')}
          >
            Чему вы научитесь
          </button>
          <button
            className={`px-4 py-2 ${activeSection === 'materials' ? 'text-black border-b-2 border-black' : ''}`}
            onClick={() => setActiveSection('materials')}
          >
            Материалы курса
          </button>
          <button
            className={`px-4 py-2 ${activeSection === 'reviews' ? 'text-black border-b-2 border-black' : ''}`}
            onClick={() => setActiveSection('reviews')}
          >
            Отзывы
          </button>
          <button
            className={`px-4 py-2 ${activeSection === 'instructor' ? 'text-black border-b-2 border-black' : ''}`}
            onClick={() => setActiveSection('instructor')}
          >
            Преподаватель
          </button>
        </div>
        {renderContent()}
        <InstructorCourses />
      </div>
    </div>
  )
}

export default UnregisteredCoursePage

interface CourseProps {
  courseId: string // Unique identifier for each course
  image: string
  title: string
  rating: number
  reviews: number
  lectureLength: number
}

const CourseCard: React.FC<CourseProps> = ({
  courseId,
  image,
  title,
  rating,
  reviews,
  lectureLength,
}) => {
  return (
    <NavLink
      to={`/courses/course/${courseId}`}
      className='no-underline flex justify-center w-full h-full'
    >
      <div className='bg-white p-4 w-5/12 rounded-lg shadow-md flex flex-col items-center hover:bg-gray-100 text-black transition duration-300 ease-in-out transform hover:scale-105'>
        <img src={image} alt={title} className='w-24 h-24 mb-2' />
        <div className='text-center flex flex-col justify-center'>
          <h3 className='text-sm font-bold'>{title}</h3>
          <p className='text-xs'>{`${rating} ⭐ (${reviews})`}</p>
          <p className='text-xs'>всего {lectureLength} ч лекций</p>
        </div>
      </div>
    </NavLink>
  )
}

interface Course {
  courseId: string
  image: string
  title: string
  rating: number
  reviews: number
  lectureLength: number
}

const InstructorCourses: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const courses: Course[] = [
    {
      courseId: '1123',
      image: 'https://via.placeholder.com/150',
      title: 'Course 1',
      rating: 4.9,
      reviews: 606,
      lectureLength: 5,
    },
    {
      courseId: '26',
      image: 'https://via.placeholder.com/150',
      title: 'Course 1',
      rating: 4.9,
      reviews: 606,
      lectureLength: 5,
    },
    {
      courseId: '213',
      image: 'https://via.placeholder.com/150',
      title: 'Course 1',
      rating: 4.9,
      reviews: 606,
      lectureLength: 5,
    },
    {
      courseId: '424',
      image: 'https://via.placeholder.com/150',
      title: 'Course 1',
      rating: 4.9,
      reviews: 606,
      lectureLength: 5,
    },
    {
      courseId: '55',
      image: 'https://via.placeholder.com/150',
      title: 'Course 1',
      rating: 4.9,
      reviews: 606,
      lectureLength: 5,
    },
    {
      courseId: '12',
      image: 'https://via.placeholder.com/150',
      title: 'Course 1',
      rating: 4.9,
      reviews: 606,
      lectureLength: 5,
    },
    {
      courseId: '11',
      image: 'https://via.placeholder.com/150',
      title: 'Course 1',
      rating: 4.9,
      reviews: 606,
      lectureLength: 5,
    },
    {
      courseId: '13',
      image: 'https://via.placeholder.com/150',
      title: 'Course 1',
      rating: 4.9,
      reviews: 606,
      lectureLength: 5,
    },
    {
      courseId: '6',
      image: 'https://via.placeholder.com/150',
      title: 'Course 1',
      rating: 4.9,
      reviews: 606,
      lectureLength: 5,
    },
    {
      courseId: '7',
      image: 'https://via.placeholder.com/150',
      title: 'Course 1',
      rating: 4.9,
      reviews: 606,
      lectureLength: 5,
    },
    {
      courseId: '8',
      image: 'https://via.placeholder.com/150',
      title: 'Course 1',
      rating: 4.9,
      reviews: 606,
      lectureLength: 5,
    },
    {
      courseId: '9',
      image: 'https://via.placeholder.com/150',
      title: 'Course 1',
      rating: 4.9,
      reviews: 606,
      lectureLength: 5,
    },
    {
      courseId: '10',
      image: 'https://via.placeholder.com/150',
      title: 'Course 1',
      rating: 4.9,
      reviews: 606,
      lectureLength: 5,
    },
  ]
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  const instructorID = 1

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(courses.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      <h1 className={'border-b-2 border-black pb-4 font-semibold mt-16'}>
        Другие курсы от{' '}
        <NavLink
          to={`/users/user/${instructorID}`}
          className={'hover:text-blue-500 text-purple-700'}
        >
          инструктора:
        </NavLink>
      </h1>
      <div className='bg-white p-6 shadow mt-4 grid grid-cols-3 gap-4 items-center'>
        {currentCourses.map((course) => (
          <CourseCard key={course.courseId} {...course} />
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`mx-1 px-3 py-1 border rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  )
}

interface RatingComponentProps {
  rating: number // Rating value, e.g., 4.9
  totalRatings: number // Total number of ratings, e.g., 606
}

const RatingComponent: React.FC<RatingComponentProps> = ({ rating, totalRatings }) => {
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5 ? 1 : 0
  const emptyStars = 5 - fullStars - halfStar

  const fullStarsIcons = Array(fullStars).fill(
    <FaStar className='text-yellow-500' key={fullStars + 50} />
  )
  const halfStarIcon = halfStar ? (
    <FaStarHalfAlt className='text-yellow-500' key={halfStar + 20} />
  ) : null
  const emptyStarsIcons = Array(emptyStars).fill(
    <FaRegStar className='text-yellow-500' key={emptyStars + 30} />
  )

  return (
    <div className='flex items-center text-lg'>
      <span className='font-semibold text-gray-900 mr-1'>{rating.toFixed(1)}</span>
      {fullStarsIcons}
      {halfStarIcon}
      {emptyStarsIcons}
      <span className='text-gray-600 ml-2'>({totalRatings.toLocaleString()} оценок)</span>
    </div>
  )
}
