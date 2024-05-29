import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

interface ITag {
  id: number
  title: string
}

interface Thread {
  id: number
  title: string
  author: string
  createdDate: string
  lastReplyDate: string
  repliesCount: number
  tags: ITag[]
}

interface ThreadCardProps {
  title: string
  author: string
  createdDate: string
  lastReplyDate: string
  repliesCount: number
  tags: ITag[]
}

const initialThreads: Thread[] = [
  {
    id: 1,
    title: 'Как начать программировать на Python',
    author: 'Алексей Смирнов',
    createdDate: '2024-05-10',
    lastReplyDate: '2024-05-12',
    repliesCount: 8,
    tags: [
      { id: 1, title: 'Python' },
      { id: 2, title: 'Начало' },
      { id: 3, title: 'Программирование' },
    ],
  },
  {
    id: 2,
    title: 'Лучшие практики JavaScript',
    author: 'Марина Иванова',
    createdDate: '2024-05-08',
    lastReplyDate: '2024-05-11',
    repliesCount: 15,
    tags: [
      { id: 4, title: 'JavaScript' },
      { id: 5, title: 'Best Practices' },
      { id: 6, title: 'Web Development' },
    ],
  },
  {
    id: 3,
    title: 'Обзор новых функций в React 18',
    author: 'Виктор Петров',
    createdDate: '2024-05-07',
    lastReplyDate: '2024-05-10',
    repliesCount: 12,
    tags: [
      { id: 7, title: 'React' },
      { id: 8, title: 'Frontend' },
      { id: 9, title: 'JavaScript' },
    ],
  },
  {
    id: 4,
    title: 'Понимание асинхронного программирования в Node.js',
    author: 'Екатерина Кузнецова',
    createdDate: '2024-05-05',
    lastReplyDate: '2024-05-09',
    repliesCount: 22,
    tags: [
      { id: 10, title: 'Node.js' },
      { id: 11, title: 'Async' },
      { id: 12, title: 'JavaScript' },
    ],
  },
  {
    id: 5,
    title: 'Как улучшить производительность веб-сайта',
    author: 'Дмитрий Соколов',
    createdDate: '2024-05-04',
    lastReplyDate: '2024-05-08',
    repliesCount: 18,
    tags: [
      { id: 13, title: 'Performance' },
      { id: 14, title: 'Optimization' },
      { id: 15, title: 'Web' },
    ],
  },
  {
    id: 6,
    title: 'Основы работы с базами данных',
    author: 'Анна Попова',
    createdDate: '2024-05-02',
    lastReplyDate: '2024-05-06',
    repliesCount: 7,
    tags: [
      { id: 16, title: 'Databases' },
      { id: 17, title: 'SQL' },
      { id: 18, title: 'Backend' },
    ],
  },
  {
    id: 7,
    title: 'Что нового в CSS 2024',
    author: 'Сергей Ковалев',
    createdDate: '2024-05-01',
    lastReplyDate: '2024-05-05',
    repliesCount: 5,
    tags: [
      { id: 19, title: 'CSS' },
      { id: 20, title: 'Web Design' },
      { id: 21, title: 'Frontend' },
    ],
  },
]

const ThreadCard: React.FC<ThreadCardProps & { onTagClick: (tag: ITag) => void }> = ({
  title,
  author,
  createdDate,
  lastReplyDate,
  repliesCount,
  tags,
  onTagClick,
}) => {
  const [showTagsPopup, setShowTagsPopup] = useState(false)

  const handleMouseEnter = () => {
    setShowTagsPopup(true)
  }

  const handleMouseLeave = () => {
    setShowTagsPopup(false)
  }

  return (
    <div className='flex flex-col md:flex-row items-center justify-between border border-gray-200 rounded-lg p-4 mb-4 -z-10'>
      <Helmet>
        <title>Форум</title>
      </Helmet>
      <div className='flex flex-col md:flex-row md:items-center md:space-x-4'>
        <h2 className='text-lg font-semibold mb-2'>{title}</h2>
        <div className='flex items-center mb-2'>
          <span className='text-sm text-gray-600 mr-2'>Автор: {author}</span>
          <span className='text-sm text-gray-600'>Дата создания: {createdDate}</span>
        </div>
        <div className='flex items-center'>
          {tags.slice(0, 3).map((tag, index) => (
            <TagCard key={index} tag={tag} handleTagSelect={() => onTagClick(tag)} />
          ))}
          {tags.length > 3 && (
            <div
              className='relative'
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className='bg-gray-200 text-xs px-2 py-1 mr-1 cursor-pointer'>
                + {tags.length - 3} more
              </div>
              {showTagsPopup && (
                <div
                  className='absolute right-[calc(100% + 10px)] top-0 mt-6 py-2 px-4 bg-white border border-gray-300 rounded shadow-lg flex z-50'
                  onClick={() => setShowTagsPopup(false)}
                >
                  {tags.slice(3).map((tag, index) => (
                    <TagCard
                      key={index}
                      tag={tag}
                      handleTagSelect={() => onTagClick(tag)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col  md:items-center justify-start items-start'>
        <span className='text-sm text-gray-600 mb-2'>Ответов: {repliesCount}</span>
        <span className='text-sm text-gray-600'>
          Дата последнего ответа: {lastReplyDate}
        </span>
      </div>
    </div>
  )
}

const ForumPage: React.FC = () => {
  const [filter, setFilter] = useState<'hot' | 'newest'>('hot')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [threads, setThreads] = useState<Thread[]>([])
  const [filteredThreads, setFilteredThreads] = useState<Thread[]>([])
  const [activeTags, setActiveTags] = useState<ITag[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [tags, setTags] = useState<ITag[]>([])

  const fetchTags = async (): Promise<ITag[]> => {
    // Заглушка: имитация запроса к серверу для получения списка тегов
    return [
      { id: 1, title: 'Python' },
      { id: 2, title: 'JavaScript' },
      { id: 3, title: 'React' },
      { id: 4, title: 'Node.js' },
      { id: 5, title: 'Performance' },
      { id: 6, title: 'SQL' },
      { id: 7, title: 'Databases' },
      { id: 8, title: 'Web Development' },
      { id: 9, title: 'Frontend' },
      { id: 10, title: 'Backend' },
      { id: 11, title: 'Async' },
      { id: 12, title: 'Best Practices' },
      { id: 13, title: 'Optimization' },
      { id: 14, title: 'Web Design' },
      { id: 15, title: 'Начало' },
      { id: 16, title: 'Программирование' },
      { id: 17, title: 'API' },
      { id: 18, title: 'Security' },
      { id: 19, title: 'DevOps' },
      { id: 20, title: 'Machine Learning' },
      { id: 21, title: 'Data Science' },
      { id: 22, title: 'Cloud Computing' },
      { id: 23, title: 'AI' },
      { id: 24, title: 'Testing' },
      { id: 25, title: 'CI/CD' },
      { id: 26, title: 'Docker' },
      { id: 27, title: 'Kubernetes' },
      { id: 28, title: 'Microservices' },
      { id: 29, title: 'Agile' },
      { id: 30, title: 'Scrum' },
    ]
  }

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTags = await fetchTags()
      setTags(fetchedTags)
    }
    fetchData().then((r) => console.log(`success ${r}`))

    setThreads(initialThreads)
    setFilteredThreads(initialThreads)
  }, [])

  useEffect(() => {
    if (activeTags.length > 0) {
      const filtered = threads.filter((thread) =>
        activeTags.every((tag) =>
          thread.tags.some((threadTag) => threadTag.id === tag.id)
        )
      )
      setFilteredThreads(filtered)
    } else {
      const sortedThreads = [...threads]
      if (filter === 'newest') {
        sortedThreads.sort(
          (a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        )
      } else if (filter === 'hot') {
        sortedThreads.sort((a, b) => {
          const repliesDifference = b.repliesCount - a.repliesCount
          if (repliesDifference !== 0) {
            return repliesDifference
          } else {
            return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
          }
        })
      }
      setFilteredThreads(sortedThreads)
    }
  }, [activeTags, filter, threads])

  useEffect(() => {
    const filtered = threads.filter((thread) =>
      thread.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredThreads(filtered)
  }, [searchQuery, threads])

  const handleCloseCreateModal = () => {
    setShowCreateModal(false)
  }

  const handleAddThread = (newThread: Thread) => {
    newThread.repliesCount = Math.floor(Math.random() * 20)
    setThreads((prevThreads) => [...prevThreads, newThread])
    setFilteredThreads((prevThreads) => [...prevThreads, newThread])

    if (filter === 'hot') {
      const sortedThreads = [...filteredThreads, newThread]
      sortedThreads.sort((a, b) => {
        const repliesDifference = b.repliesCount - a.repliesCount
        if (repliesDifference !== 0) {
          return repliesDifference
        } else {
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        }
      })
      setFilteredThreads(sortedThreads)
    }
  }

  const handleTagSelect = (tag: ITag) => {
    setActiveTags((prevTags) => [...prevTags, tag])
    setTags(tags.filter((t) => t.id !== tag.id))
  }

  const handleRemoveTag = (tag: ITag) => {
    setActiveTags((prevTags) => prevTags.filter((prevTag) => prevTag.id !== tag.id))
  }

  const handleTagClick = (tag: ITag) => {
    if (activeTags.some((activeTag) => activeTag.id === tag.id)) {
      setActiveTags(activeTags.filter((item) => item.id !== tag.id))
    } else {
      setActiveTags([...activeTags, tag])
    }
    console.log(`Clicked on tag: ${tag.title}`)
  }

  // Валидация и обработка блокировки скроллинга
  useEffect(() => {
    document.body.style.overflow = showCreateModal ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showCreateModal])

  return (
    <div className='flex flex-col lg:flex-row justify-center min-h-screen'>
      <div className='w-full lg:w-3/4 p-4'>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search threads...'
          className='w-full border border-gray-300 p-2 rounded mb-4'
        />
        {filteredThreads.length > 0 ? (
          filteredThreads.map((thread) => (
            <ThreadCard
              key={thread.id}
              title={thread.title}
              author={thread.author}
              createdDate={thread.createdDate}
              lastReplyDate={thread.lastReplyDate}
              repliesCount={thread.repliesCount}
              tags={thread.tags}
              onTagClick={handleTagClick}
            />
          ))
        ) : (
          <div className='flex flex-col items-center justify-center h-full'>
            <p className='text-center mb-4'>
              Обсуждение по заданным фильтрам не найдено.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className={'bg-red-500 text-white px-4 py-2 rounded'}
            >
              Начните новое обсуждение!
            </button>
          </div>
        )}
      </div>
      <div className='w-full lg:w-1/4 p-4 border-l border-gray-200'>
        <div className='mb-4'>
          {activeTags.length > 0 && (
            <div className={'flex'}>
              {activeTags.map((tag, index) => (
                <div
                  key={index}
                  className='bg-gray-700 text-white px-4 mr-2 py-1 mb-2 flex items-center w-30 text-center'
                >
                  <span>{tag.title}</span>
                  <button
                    className='ml-2 text-xl text-right text-white'
                    onClick={() => handleRemoveTag(tag)}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                className={'py-1 px-2 bg-black text-white rounded-full'}
                onClick={() => setActiveTags([])}
              >
                Очистить теги
              </button>
            </div>
          )}
        </div>
        <div className='mb-4'>
          <h2 className='text-lg font-semibold mb-2'>Теги</h2>
          <div className='flex flex-wrap '>
            {tags.map((tag) => (
              <TagCard
                key={tag.id}
                tag={tag}
                handleTagSelect={() => handleTagSelect(tag)}
              />
            ))}
          </div>
        </div>
        <div className='mb-4'>
          <button
            onClick={() => setFilter('hot')}
            className={`bg-gray-600 text-white px-4 py-2 mr-3  ${
              filter === 'hot' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Горячие обсуждения
          </button>
          <button
            onClick={() => setFilter('newest')}
            className={`bg-gray-600 text-white px-4 py-2  ${
              filter === 'newest' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Самые новые обсуждения
          </button>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className={
            'bg-white text-black border-2 shadow-md border-black px-4 py-2 rounded block hover:bg-gray-50'
          }
        >
          Создайте новое обсуждение!
        </button>
      </div>
      {showCreateModal && (
        <CreateThreadModal
          tags={tags}
          onClose={handleCloseCreateModal}
          onAddThread={handleAddThread}
        />
      )}
    </div>
  )
}

interface CreateThreadModalProps {
  tags: ITag[]
  onClose: () => void
  onAddThread: (thread: Thread) => void
}

const CreateThreadModal: React.FC<CreateThreadModalProps> = ({
  tags,
  onClose,
  onAddThread,
}) => {
  const [anonymous, setAnonymous] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [suggestedTags, setSuggestedTags] = useState<ITag[]>([])
  const [selectedTags, setSelectedTags] = useState<ITag[]>([])

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    const filteredTags = tags.filter((tag) =>
      tag.title.toLowerCase().includes(value.toLowerCase())
    )
    setSuggestedTags(filteredTags)
  }

  const handleTagSelect = (tag: ITag) => {
    setInputValue('')
    setSuggestedTags([])
    setSelectedTags((prevTags) => [...prevTags, tag])
  }

  const handleRemoveTag = (tag: ITag) => {
    setSelectedTags((prevTags) => prevTags.filter((prevTag) => prevTag.id !== tag.id))
  }

  const handleCreateThread = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const newThread: Thread = {
      id: Math.random(),
      title,
      author: anonymous ? 'Anonymous' : 'User',
      createdDate: new Date().toISOString().split('T')[0],
      lastReplyDate: new Date().toISOString().split('T')[0],
      tags: selectedTags,
      repliesCount: 0,
    }
    onAddThread(newThread)
    onClose()
    setIsLoading(false)
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-4 rounded-lg w-full max-w-lg'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold'>Создать новое обсуждение</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>
            <input
              type='checkbox'
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
            <span className='ml-2'>Анонимно</span>
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
              <div className='absolute top-full bg-white border border-gray-300 shadow rounded mt-1 w-full  overflow-y-scroll h-[30vh]'>
                {suggestedTags.map((tag) => (
                  <div
                    key={tag.id}
                    className='px-4 py-2 cursor-pointer hover:bg-gray-100'
                    onClick={() => handleTagSelect(tag)}
                  >
                    {tag.title}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='flex flex-wrap mb-2'>
            {selectedTags.map((tag) => (
              <div
                key={tag.id}
                className='bg-blue-500 text-white px-2 py-1 rounded-full mr-2 mb-2 flex items-center'
              >
                <span>{tag.title}</span>
                <button className='ml-2 text-xs' onClick={() => handleRemoveTag(tag)}>
                  &times;
                </button>
              </div>
            ))}
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Thread Content'
            className='w-full border border-gray-300 p-2 rounded'
          />
        </div>
        <button
          onClick={handleCreateThread}
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'В процессе...' : 'Создать обсуждение'}
        </button>
      </div>
    </div>
  )
}

interface ITagCardProps {
  tag: ITag
  handleTagSelect: (tag: ITag) => void
}

const TagCard: React.FC<ITagCardProps> = ({ tag, handleTagSelect }) => {
  return (
    <div
      key={tag.id}
      className='bg-gray-200 text-xs px-2 py-1 mr-2 cursor-pointer mb-2'
      onClick={() => handleTagSelect(tag)}
    >
      {tag.title}
    </div>
  )
}

export default ForumPage
