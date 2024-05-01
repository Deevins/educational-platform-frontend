import React, { useEffect, useState } from 'react'

interface Thread {
  id: number
  title: string
  author: string
  createdDate: string
  lastReplyDate: string
  tags: string[]
}

interface ThreadCardProps {
  title: string
  author: string
  createdDate: string
  lastReplyDate: string
  tags: string[]
}

const ThreadCard: React.FC<ThreadCardProps> = ({
  title,
  author,
  createdDate,
  lastReplyDate,
  tags,
}) => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between border border-gray-200 rounded-lg p-4 mb-4'>
      <div className='flex flex-col md:flex-row md:items-center md:space-x-4'>
        <h2 className='text-lg font-semibold mb-2'>{title}</h2>
        <div className='flex items-center mb-2'>
          <span className='text-sm text-gray-600 mr-2'>{author}</span>
          <span className='text-sm text-gray-600'>{createdDate}</span>
        </div>
        <div className='flex items-center'>
          {tags.slice(0, 3).map((tag, index) => (
            <div key={index} className='bg-gray-200 text-xs rounded-full px-2 mr-1'>
              {tag}
            </div>
          ))}
          {tags.length > 3 && (
            <div className='bg-gray-200 text-xs rounded-full px-2 mr-1'>
              {tags.length - 3} more
            </div>
          )}
        </div>
      </div>
      <div className='mt-4 md:mt-0'>
        <span className='text-sm text-gray-600'>{lastReplyDate}</span>
      </div>
    </div>
  )
}

const CreateThreadModal: React.FC<{
  onClose: () => void
  onAddThread: (thread: Thread) => void
}> = ({ onClose, onAddThread }) => {
  const [anonymous, setAnonymous] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [suggestedTags, setSuggestedTags] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Mock data for tag suggestions
  const tagSuggestions: string[] = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5']

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    // Filter tag suggestions based on input value
    const filteredTags = tagSuggestions.filter((tag) =>
      tag.toLowerCase().includes(value.toLowerCase())
    )
    setSuggestedTags(filteredTags)
  }

  const handleTagSelect = (tag: string) => {
    setInputValue('')
    setSuggestedTags([])
    setSelectedTags((prevTags) => [...prevTags, tag])
  }

  const handleRemoveTag = (tag: string) => {
    setSelectedTags((prevTags) => prevTags.filter((prevTag) => prevTag !== tag))
  }

  const handleCreateThread = async () => {
    setIsLoading(true)
    // Simulating API request delay
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // Mock logic to create a new thread
    const newThread: Thread = {
      id: Math.random(),
      title,
      author: anonymous ? 'Anonymous' : 'User',
      createdDate: new Date().toISOString().split('T')[0],
      lastReplyDate: new Date().toISOString().split('T')[0],
      tags: selectedTags,
    }
    // After creation, you can close the modal and reset form fields
    onAddThread(newThread)
    onClose()
    setIsLoading(false)
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-4 rounded-lg w-full max-w-lg'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold'>Create New Thread</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>
            <input
              type='checkbox'
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
            <span className='ml-2'>Anonymous</span>
          </label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Thread Title'
            className='w-full border border-gray-300 p-2 rounded mb-2'
          />
          <div className='relative'>
            <input
              type='text'
              value={inputValue}
              onChange={handleTagInput}
              placeholder='Tags'
              className='w-full border border-gray-300 p-2 rounded mb-2'
            />
            {suggestedTags.length > 0 && (
              <div className='absolute top-full bg-white border border-gray-300 shadow rounded mt-1 w-full'>
                {suggestedTags.map((tag, index) => (
                  <div
                    key={index}
                    className='px-4 py-2 cursor-pointer hover:bg-gray-100'
                    onClick={() => handleTagSelect(tag)}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Selected tags */}
          <div className='flex flex-wrap mb-2'>
            {selectedTags.map((tag, index) => (
              <div
                key={index}
                className='bg-blue-500 text-white px-2 py-1 rounded-full mr-2 mb-2 flex items-center'
              >
                <span>{tag}</span>
                <button className='ml-2 text-xs' onClick={() => handleRemoveTag(tag)}>
                  &times;
                </button>
              </div>
            ))}
          </div>
          {/* Tag suggestion list */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Thread Content'
            className='w-full border border-gray-300 p-2 rounded'
          />
        </div>
        <button
          onClick={handleCreateThread}
          className={`bg-blue-500 text-white px-4 py-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Creating...' : 'Create Post'}
        </button>
      </div>
    </div>
  )
}

const ForumPage: React.FC = () => {
  const [filter, setFilter] = useState<'hot' | 'newest'>('hot')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [threads, setThreads] = useState<Thread[]>([])
  const [filteredThreads, setFilteredThreads] = useState<Thread[]>([])
  const [activeTags, setActiveTags] = useState<string[]>([])

  // Mock data for initial threads
  useEffect(() => {
    const initialThreads: Thread[] = [
      {
        id: 1,
        title: 'Thread 1',
        author: 'User 1',
        createdDate: '2024-04-30',
        lastReplyDate: '2024-05-01',
        tags: ['tag1', 'tag2', 'tag3'],
      },
      {
        id: 2,
        title: 'Thread 2',
        author: 'User 2',
        createdDate: '2024-04-29',
        lastReplyDate: '2024-04-30',
        tags: ['tag4', 'tag5'],
      },
      // Add more mock data as needed
    ]
    setThreads(initialThreads)
    setFilteredThreads(initialThreads)
  }, [])

  useEffect(() => {
    // Apply tag filters
    if (activeTags.length > 0) {
      const filtered = threads.filter((thread) =>
        activeTags.every((tag) => thread.tags.includes(tag))
      )
      setFilteredThreads(filtered)
    } else {
      // Apply sorting
      const sortedThreads = [...threads]
      if (filter === 'newest') {
        sortedThreads.sort(
          (a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        )
      } else if (filter === 'hot') {
        // Logic to sort by popularity (e.g., number of views or replies)
        // Here, we're just reversing the order of threads for demonstration purposes
        sortedThreads.reverse()
      }
      setFilteredThreads(sortedThreads)
    }
  }, [activeTags, filter, threads])

  const handleCloseCreateModal = () => {
    setShowCreateModal(false)
  }

  const handleAddThread = (newThread: Thread) => {
    setThreads((prevThreads) => [...prevThreads, newThread])
  }

  const handleTagSelect = (tag: string) => {
    setActiveTags((prevTags) => [...prevTags, tag])
  }

  const handleRemoveTag = (tag: string) => {
    setActiveTags((prevTags) => prevTags.filter((prevTag) => prevTag !== tag))
  }

  return (
    <div className='flex flex-col md:flex-row justify-center'>
      {/* Thread list */}
      <div className='w-full md:w-3/4 p-4'>
        {filteredThreads.map((thread) => (
          <ThreadCard
            key={thread.id}
            title={thread.title}
            author={thread.author}
            createdDate={thread.createdDate}
            lastReplyDate={thread.lastReplyDate}
            tags={thread.tags}
          />
        ))}
      </div>
      {/* Right sidebar */}
      <div className='w-full md:w-1/4 p-4 border-l border-gray-200'>
        <div className='mb-4'>
          <input
            type='text'
            placeholder='Search threads'
            className='w-full border border-gray-300 p-2 rounded'
          />
        </div>
        <div className='mb-4'>
          {activeTags.map((tag, index) => (
            <div
              key={index}
              className='bg-blue-500 text-white px-2 py-1 rounded-full mr-2 mb-2 flex items-center'
            >
              <span>{tag}</span>
              <button className='ml-2 text-xs' onClick={() => handleRemoveTag(tag)}>
                &times;
              </button>
            </div>
          ))}
        </div>
        <div className='mb-4'>
          <h2 className='text-lg font-semibold mb-2'>Tags</h2>
          <div className='flex flex-wrap'>
            {['tag1', 'tag2', 'tag3', 'tag4', 'tag5'].map((tag, index) => (
              <div
                key={index}
                className='bg-blue-500 text-white px-2 py-1 rounded-full mr-2 mb-2 cursor-pointer'
                onClick={() => handleTagSelect(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className='mb-4'>
          <button
            onClick={() => setFilter('hot')}
            className={`bg-blue-500 text-white px-4 py-2 rounded mr-2 ${filter === 'hot' ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Hot Threads
          </button>
          <button
            onClick={() => setFilter('newest')}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${filter === 'newest' ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Newest Threads
          </button>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className={'bg-red-500 text-white px-4 py-2 rounded block'}
        >
          Create new thread
        </button>
      </div>
      {showCreateModal && (
        <CreateThreadModal
          onClose={handleCloseCreateModal}
          onAddThread={handleAddThread}
        />
      )}
    </div>
  )
}

export default ForumPage
