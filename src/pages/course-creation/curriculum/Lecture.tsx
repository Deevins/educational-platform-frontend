import React, { useState } from 'react'
import { FaCheckCircle, FaTrash } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'
import { IoIosArrowDown, IoIosArrowUp, IoMdAdd } from 'react-icons/io'
import { api_lecture } from '@/pages/course-creation/curriculum/types.ts'

type Video = {
  name: string
  type: string
  status: string
  date: string
}
type LectureComponentProps = {
  lectureData: api_lecture
  onRemove: (serial: number) => void
  onUpdate: (serial: number, title: string) => void
}

const LectureComponent: React.FC<LectureComponentProps> = ({
  lectureData,
  onRemove,
  onUpdate,
}) => {
  const [editButtonsVisible, setIsEditButtonsVisible] = React.useState(false)
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(lectureData.title)
  const [isExpanded, setIsExpanded] = useState(false)
  const [video, setVideo] = useState<Video | null>(null)

  const toggleEditMode = () => {
    if (editMode && title !== lectureData.title) {
      onUpdate(lectureData.id, title)
    }
    setEditMode(!editMode)
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const removeLecture = () => {
    onRemove(lectureData.id)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      const newVideo: Video = {
        name: file.name,
        type: 'Video',
        status: '0%', // Placeholder for upload status
        date: new Date().toLocaleDateString(),
      }
      setVideo(newVideo)
    }
  }

  return (
    <div
      className='bg-white border-black border-2 flex flex-col items-center justify-between min-h-12 ml-16 py-1.5 mb-6 self-end'
      onMouseEnter={() => setIsEditButtonsVisible(true)}
      onMouseLeave={() => setIsEditButtonsVisible(false)}
    >
      <div className='flex items-center justify-between w-full'>
        <div className='flex items-center'>
          <FaCheckCircle className='ml-2 mr-1' />
          <p className='mr-2'>Лекция {lectureData.serial_number}:</p>
          {editMode ? (
            <input
              type='text'
              value={title}
              onChange={handleTitleChange}
              onBlur={toggleEditMode}
              className='border-2 border-gray-300 p-1'
              autoFocus
            />
          ) : (
            <p onClick={toggleEditMode}>{title}</p>
          )}
          {editButtonsVisible && (
            <span className='flex scale-90 items-center ml-2'>
              <MdModeEdit
                className='mr-4 hover:cursor-pointer'
                onClick={toggleEditMode}
              />
              <FaTrash className='mr-4 hover:cursor-pointer' onClick={removeLecture} />
            </span>
          )}
        </div>
        <div
          className='flex items-center justify-center hover:cursor-pointer'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <IoIosArrowUp className='mr-4' />
          ) : (
            <IoIosArrowDown className='mr-4' />
          )}
        </div>
      </div>
      {isExpanded && (
        <div className='w-full p-2'>
          <p className='text-left'>{lectureData.description}</p>
          <div className='flex justify-end mt-2'>
            <input
              type='file'
              accept='video/*'
              onChange={handleFileUpload}
              hidden
              id='video-upload'
            />
            <label
              htmlFor='video-upload'
              className='flex items-center border-black border-[1px] px-2 py-0.5 font-medium hover:bg-gray-300 cursor-pointer'
            >
              <IoMdAdd />
              <p className='pb-0.5'>{video ? 'заменить видео' : 'загрузить видео'}</p>
            </label>
          </div>
          {video && (
            <div className='flex justify-between mt-2'>
              <span>{video.name}</span>
              <span>{video.type}</span>
              <span>{video.status}</span>
              <span>{video.date}</span>
              <button onClick={() => setVideo(null)} className='hover:bg-gray-300 p-1'>
                Удалить
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default LectureComponent
