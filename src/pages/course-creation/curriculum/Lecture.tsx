import React, { useEffect, useState } from 'react'
import { FaCheckCircle, FaTrash } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'
import { IoIosArrowDown, IoIosArrowUp, IoMdAdd } from 'react-icons/io'
import {
  api_lecture,
  SectionComponentType,
} from '@/pages/course-creation/curriculum/types.ts'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'

type LectureComponentProps = {
  lectureData: api_lecture
  onRemove: (id: number, componentType: SectionComponentType) => void
  onUpdate: (id: number, title: string, componentType: SectionComponentType) => void
}

const LectureComponent: React.FC<LectureComponentProps> = ({
  lectureData,
  onRemove,
  onUpdate,
}) => {
  const [editButtonsVisible, setIsEditButtonsVisible] = React.useState(false)
  const [editMode, setEditMode] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [videoRemoved, setVideoRemoved] = useState(false)
  const [videoUploaded, setVideoUploaded] = useState(false)
  const [videoURL, setVideoURL] = useState<string>('')
  const courseID = useParams<{ courseID: string }>().courseID

  useEffect(() => {
    setVideoURL('')
  }, [videoRemoved])

  useEffect(() => {
    setVideoURL(lectureData.video_url)
  }, [videoUploaded])

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(lectureData.id, event.target.value, 'lecture')
  }

  const removeLecture = () => {
    onRemove(lectureData.id, 'lecture')
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await axios.post<{ video_url: string }>(
          `http://localhost:8080/courses/update-lecture-video-url/${courseID}/${lectureData.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )

        if (response.status === 200) {
          console.log('Video uploaded successfully:', response)
          setVideoUploaded((prev) => !prev)
          setVideoURL(response.data.video_url)
        }
      } catch (error) {
        console.error('Error uploading Video:', error)
      }
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
              value={lectureData.title}
              onChange={handleTitleChange}
              onBlur={toggleEditMode}
              className='border-2 border-gray-300 p-1'
              autoFocus
            />
          ) : (
            <p onClick={toggleEditMode}>{lectureData.title}</p>
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
              <p className='pb-0.5'>{videoURL ? 'заменить видео' : 'загрузить видео'}</p>
            </label>
          </div>
          {videoURL && (
            <div className='flex justify-between mt-2 w-full'>
              <div className='w-full max-w-xl flex content-center justify-between'>
                <ReactPlayer url={videoURL} controls width='60%' height='auto' />
                <button
                  onClick={async () => {
                    setVideoURL('')
                    await axios.post(
                      `http://localhost:8080/courses/remove-lecture-video/${courseID}/${lectureData.id}`
                    )
                    setVideoRemoved((prev) => !prev)
                  }}
                  className='hover:bg-gray-300 py-1 px-4 bg-gray-200 border-black border-[1px] hover:cursor-pointer ml-4  h-12 mt-[10%]'
                >
                  Удалить запись лекции
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default LectureComponent
