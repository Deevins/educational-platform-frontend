import React, { useState } from 'react'
import video from '../../../public/videovideo.mp4'
import ReactPlayer from 'react-player'

interface CourseSection {
  title: string
  duration: string
  items: CourseItem[]
}

interface CourseItem {
  title: string
  type: 'Lecture' | 'Test'
  duration: string
  videoUrl: string // URL for video
}

const courseData: CourseSection[] = [
  {
    title: 'Chapter 1: Writing Your Framework',
    duration: '4h 14m',
    items: [
      {
        title: 'Part 1: Basic Framework Writing',
        type: 'Lecture',
        duration: '1h 34m',
        videoUrl: video,
      },
      {
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
    setSelectedItemIndex(null)
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
        {selectedSectionIndex !== null && selectedItemIndex !== null && (
          <>
            <DetailContent
              title={courseData[selectedSectionIndex].items[selectedItemIndex].title}
              type={courseData[selectedSectionIndex].items[selectedItemIndex].type}
              duration={
                courseData[selectedSectionIndex].items[selectedItemIndex].duration
              }
              activeTab={activeTab}
            />
            <VideoPlayer
              url={courseData[selectedSectionIndex].items[selectedItemIndex].videoUrl}
            />
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
          </>
        )}
      </div>
    </div>
  )
}

export default CourseActivePage

interface DetailContentProps {
  title: string
  type: string
  duration: string
  activeTab: string
}

const DetailContent: React.FC<DetailContentProps> = ({
  title,
  type,
  duration,
  activeTab,
}) => {
  return (
    <div>
      <h1 className='text-2xl font-bold'>{title}</h1>
      <p>Type: {type}</p>
      <p>Duration: {duration}</p>
      {activeTab === 'Overview' && (
        <div className='mt-4'>
          <h2 className='text-xl'>Course Overview:</h2>
          <p>
            This section provides detailed information about the course, including
            objectives, content outline, and more.
          </p>
          {/* Dynamic content based on the activeTab */}
        </div>
      )}
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
    <div className='w-80 bg-gray-800 text-white p-5 overflow-y-auto'>
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
  return <ReactPlayer url={url} width='100%' controls={true} />
}

interface NavbarProps {
  activeTab: string
  setActiveTab: (tabName: string) => void
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className='flex border-b'>
      <button
        className={`p-2 ${activeTab === 'Overview' ? 'font-bold' : ''}`}
        onClick={() => setActiveTab('Overview')}
      >
        Overview
      </button>
      {/* Add more buttons as needed */}
    </div>
  )
}
