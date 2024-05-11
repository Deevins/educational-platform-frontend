import React, { useState } from 'react'
import video from '../../../public/videovideo.mp4'
import ReactPlayer from 'react-player'

interface CourseSection {
  id: number
  title: string
  duration: string
  items: CourseItem[]
}

interface CourseItem {
  id: number
  title: string
  type: 'Lecture' | 'Test'
  duration: string
  videoUrl: string // URL for video
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
        type: 'Lecture',
        duration: '1h 34m',
        videoUrl: video,
      },
      {
        id: 321,
        title: 'Part 2: User Interface Development',
        type: 'Lecture',
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
        type: 'Lecture',
        duration: '1h 34m',
        videoUrl: video,
      },
      {
        id: 321,
        title: 'Part 2: User Interface Development',
        type: 'Lecture',
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
        type: 'Lecture',
        duration: '1h 34m',
        videoUrl: video,
      },
      {
        id: 321,
        title: 'Part 2: User Interface Development',
        type: 'Lecture',
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
        type: 'Lecture',
        duration: '1h 34m',
        videoUrl: video,
      },
      {
        id: 321,
        title: 'Part 2: User Interface Development',
        type: 'Lecture',
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
        type: 'Lecture',
        duration: '1h 34m',
        videoUrl: video,
      },
      {
        id: 321,
        title: 'Part 2: User Interface Development',
        type: 'Lecture',
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
        type: 'Lecture',
        duration: '1h 34m',
        videoUrl: video,
      },
      {
        id: 321,
        title: 'Part 2: User Interface Development',
        type: 'Lecture',
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
        type: 'Lecture',
        duration: '1h 34m',
        videoUrl: video,
      },
      {
        id: 321,
        title: 'Part 2: User Interface Development',
        type: 'Lecture',
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
        type: 'Lecture',
        duration: '1h 34m',
        videoUrl: video,
      },
      {
        id: 321,
        title: 'Part 2: User Interface Development',
        type: 'Lecture',
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
        type: 'Lecture',
        duration: '1h 34m',
        videoUrl: video,
      },
      {
        id: 321,
        title: 'Part 2: User Interface Development',
        type: 'Lecture',
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
        type: 'Lecture',
        duration: '1h 34m',
        videoUrl: video,
      },
      {
        id: 321,
        title: 'Part 2: User Interface Development',
        type: 'Lecture',
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
        type: 'Lecture',
        duration: '1h 34m',
        videoUrl: video,
      },
      {
        id: 321,
        title: 'Part 2: User Interface Development',
        type: 'Lecture',
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
        type: 'Lecture',
        duration: '1h 34m',
        videoUrl: video,
      },
      {
        id: 321,
        title: 'Part 2: User Interface Development',
        type: 'Lecture',
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
        type: 'Lecture',
        duration: '1h 34m',
        videoUrl: video,
      },
      {
        id: 321,
        title: 'Part 2: User Interface Development',
        type: 'Lecture',
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
        type: 'Lecture',
        duration: '1h 34m',
        videoUrl: video,
      },
      {
        id: 321,
        title: 'Part 2: User Interface Development',
        type: 'Lecture',
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
        type: 'Lecture',
        duration: '1h 34m',
        videoUrl: video,
      },
      {
        id: 321,
        title: 'Part 2: User Interface Development',
        type: 'Lecture',
        duration: '2h 40m',
        videoUrl: video,
      },
    ],
  },

  // More chapters...
]

const CourseActivePage: React.FC = () => {
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null)
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<string>('Overview')

  const toggleSection = (index: number) => {
    setSelectedSectionIndex(index === selectedSectionIndex ? null : index)
    setSelectedItemIndex(null) // Reset item index when switching sections
  }

  const selectItem = (index: number) => {
    setSelectedItemIndex(index)
  }

  return (
    <div className='flex h-screen'>
      <SectionList
        sections={courseData}
        toggleSection={toggleSection}
        selectItem={selectItem}
        selectedSectionIndex={selectedSectionIndex}
      />
      <div className='flex-1 p-5 flex flex-col'>
        {selectedSectionIndex !== null && selectedItemIndex !== null ? (
          <>
            <VideoPlayer
              url={courseData[selectedSectionIndex].items[selectedItemIndex].videoUrl}
            />
            <div>
              <h1 className='text-2xl font-bold'>
                {courseData[selectedSectionIndex].items[selectedItemIndex].title}
              </h1>
              <p>
                Type: {courseData[selectedSectionIndex].items[selectedItemIndex].type}
              </p>
              <p>
                Duration:{' '}
                {courseData[selectedSectionIndex].items[selectedItemIndex].duration}
              </p>
            </div>
          </>
        ) : (
          <div className={'flex justify-center my-auto'}>
            <h1 className='text-xl font-bold'>
              Please select a lecture or test from the list on the left.
            </h1>
          </div>
        )}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <DetailContent activeTab={activeTab} />
      </div>
    </div>
  )
}
export default CourseActivePage

interface DetailContentProps {
  activeTab: string
}

const DetailContent: React.FC<DetailContentProps> = ({ activeTab }) => {
  return (
    <div>
      {
        activeTab === 'Overview' && (
          <div className='mt-4'>
            <h2 className='text-xl'>Course Overview:</h2>
            <p>
              This section provides detailed information about the course, including
              objectives, content outline, and more.
            </p>
          </div>
        )
        // Добавьте дополнительные условия для отображения информации для других вкладок
      }
    </div>
  )
}

interface SectionListProps {
  sections: CourseSection[]
  toggleSection: (index: number) => void
  selectItem: (itemIndex: number) => void
  selectedSectionIndex: number | null
}

const SectionList: React.FC<SectionListProps> = ({
  sections,
  toggleSection,
  selectItem,
  selectedSectionIndex,
}) => {
  return (
    <div className='w-2/12 bg-gray-800 text-white p-5 overflow-y-auto'>
      {sections.map((section, idx) => (
        <div key={idx}>
          <h3
            className='text-lg font-semibold cursor-pointer'
            onClick={() => toggleSection(idx)}
          >
            {section.title}
          </h3>
          {selectedSectionIndex === idx && (
            <ul className='list-disc pl-5'>
              {section.items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className='cursor-pointer'
                  onClick={() => selectItem(itemIdx)}
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
  return <ReactPlayer url={url} width='60%' height={'50%'} controls={true} />
}

interface NavbarProps {
  activeTab: string
  setActiveTab: (tabName: string) => void
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className='flex border-b'>
      <button
        className={`p-2 ${activeTab === 'Overview' ? 'font-bold border-b-black border-b-2' : ''}`}
        onClick={() => setActiveTab('Overview')}
      >
        Overview
      </button>
      <button
        className={`p-2 ${activeTab === 'Details' ? 'font-bold border-b-black border-b-2' : ''}`}
        onClick={() => setActiveTab('Details')}
      >
        Details
      </button>
      <button
        className={`p-2 ${activeTab === 'Tests' ? 'font-bold border-b-black border-b-2' : ''}`}
        onClick={() => setActiveTab('Tests')}
      >
        Tests
      </button>
      {/* Добавьте дополнительные кнопки по необходимости */}
    </div>
  )
}
