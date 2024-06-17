import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { NavLink, useParams } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import TestSection from '@/pages/course-learning/TestSection.tsx'
import logo from '/platform_logo.png'
import { ReviewList } from '@/components/ReviewList.tsx'
import useSWR from 'swr'
import { api_lecture, api_section } from '@/pages/course-creation/curriculum/types.ts'
import axios from 'axios'
import { CourseInfo } from '@/pages/course-page/CoursePage.tsx'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const CourseActivePage: React.FC = () => {
  const [openSections, setOpenSections] = useState<number[]>([])
  const [selectedItem, setSelectedItem] = useState<{
    section: number
    type: 'lecture' | 'test'
    item: number
  } | null>(null)
  const [activeTab, setActiveTab] = useState<string>('overview')
  const [course, setCourse] = useState<CourseInfo>()
  const { courseID } = useParams<{ courseID: string }>()

  const { data, error, isLoading } = useSWR<api_section[]>(
    `http://localhost:8080/courses/get-course-materials/${courseID}`,
    fetcher
  )

  useEffect(() => {
    const getCourse = async () => {
      const response = await axios.get<CourseInfo>(
        `http://localhost:8080/courses/get-full-course/${courseID}`
      )
      console.log(response.data)

      setCourse(response.data)
    }

    getCourse()
  }, [])

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

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading course data</div>
  if (!data) return <div>No course data found</div>
  if (!course) return <div>Loading...</div>

  return (
    <div className='flex flex-col ml-[15%] mt-[3%]'>
      <Header />
      <div className='flex w-full h-full'>
        <SectionList
          sections={data}
          toggleSection={toggleSection}
          selectItem={selectItem}
          openSections={openSections}
        />
        <div className='flex-1 p-5 flex flex-col items-center w-full ml-[7%]'>
          <div className='flex flex-col items-center w-full min-h-screen bg-white shadow-md'>
            {selectedItem ? (
              selectedItem.type === 'lecture' ? (
                <LectureComponent
                  lecture={data[selectedItem.section].lectures[selectedItem.item]}
                />
              ) : (
                <TestSection
                  id={data[selectedItem.section].tests[selectedItem.item].test_id}
                  questions={
                    data[selectedItem.section].tests[selectedItem.item].questions
                  }
                />
              )
            ) : (
              <div className='flex justify-center items-center w-full h-full'>
                <h1 className='text-2xl font-bold'>
                  Выберите секцию с левой стороны страницы для начала обучения.
                </h1>
              </div>
            )}
          </div>
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
          <DetailContent activeTab={activeTab} course={course} />
        </div>
      </div>
    </div>
  )
}

export default CourseActivePage

interface DetailContentProps {
  activeTab: string
  course: CourseInfo
}

const DetailContent: React.FC<DetailContentProps> = ({ activeTab, course }) => {
  return (
    <div className={' w-full '}>
      {activeTab === 'overview' && (
        <div className='mt-4'>
          <div>
            <p className='mb-4'></p>
          </div>
          <div className='border-b-2 border-gray-300 flex flex-col md:flex-row min-h-32'>
            <h2 className='mr-4 md:mr-16 mt-4'>Подробные данные:</h2>
            <div className='mr-4 md:mr-16 mt-4 flex flex-col md:flex-row'>
              <ul className='flex flex-col'>
                <li>
                  <strong>Уровень навыков</strong>: {course.level}
                </li>
                <li>
                  <strong>Студентов</strong>: {course.students_count}
                </li>
              </ul>
              <ul className='flex flex-col mt-4 md:mt-0 md:ml-8'>
                <li>
                  <strong>Лекций</strong>: {course.lectures_count}
                </li>
                <li>
                  <strong>Общая длина видео</strong>: {course.lectures_length}
                </li>
              </ul>
            </div>
          </div>

          <div className='flex flex-col md:flex-row min-h-8 mt-4'>
            <h2 className='ml-8 md:mr-16 text-xl font-bold mb-4'>Об этом курсе:</h2>
          </div>
          <div className='mr-4 md:mr-16 flex flex-col  ml-36'>
            {/* // TODO: Add description here via html */}
            {course.description}
          </div>
          <div className='mt-8 ml-4'>
            <>
              <h2>
                <strong>Чему вы научитесь:</strong>
              </h2>
              <ul className='list-disc pl-8 md:pl-32'>
                {course.course_goals.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
            </>
            <>
              <h2 className='mt-6'>
                <strong>
                  Существуют ли у курса какие-либо (предварительные) требования?
                </strong>
              </h2>
              <ul className='list-disc pl-8 md:pl-32'>
                {course.requirements.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
            </>

            <>
              <h2 className='mt-8'>
                <strong>Для кого этот курс:</strong>
              </h2>

              <ul className='list-disc pl-8 md:pl-32'>
                {course.target_audience.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
            </>
          </div>
        </div>
      )}
      {activeTab === 'reviews' && (
        <div className='mt-4 w-full '>
          <ReviewList reviews={course.reviews} />
        </div>
      )}
    </div>
  )
}

interface SectionListProps {
  sections: api_section[]
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
            {section.section_title}
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
                  {test.test_name}
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
  lecture: api_lecture
}

const LectureComponent: React.FC<LectureComponentProps> = ({ lecture }) => {
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseOver = () => setIsHovering(true)
  const handleMouseOut = () => setIsHovering(false)

  return (
    <div className='flex flex-col items-center w-full min-h-screen bg-white shadow-md p-5'>
      <h1 className='text-3xl font-bold'>{lecture.title}</h1>
      <p>Длительность лекции: {0}</p>
      <VideoPlayer url={lecture.video_url} />
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
