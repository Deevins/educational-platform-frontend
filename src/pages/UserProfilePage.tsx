import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import PhoneInput from 'react-phone-input-2'
import useModal from '@/utils/hooks/useModal.ts'

export interface IUser {
  id: number
  username: string
  email: string
  fullName: string
  avatar: string
  mobile?: string
  about?: string
  courses?: number[]
}

interface Course {
  id: number
  title: string
  description: string
}

type MainTab = 'friends' | 'courses'

type FriendsSubTab = 'friends' | 'requests' | 'sentRequests'

const friendsData: IUser[] = [
  {
    id: 2,
    username: 'friend1',
    fullName: 'Friend One',
    email: 'friend1@example.com',
    avatar: 'https://github.com/shadcn.png',
  },
  {
    id: 3,
    username: 'friend2',
    fullName: 'Friend Two',
    email: 'friend2@example.com',
    avatar: 'https://github.com/shadcn.png',
  },
]

const requestsData: IUser[] = [
  {
    id: 4,
    username: 'request1',
    fullName: 'Request One',
    email: 'request1@example.com',
    avatar: 'https://github.com/shadcn.png',
  },
  {
    id: 5,
    username: 'request2',
    fullName: 'Request Two',
    email: 'request2@example.com',
    avatar: 'https://github.com/shadcn.png',
  },
]

const sentRequestsData: IUser[] = [
  {
    id: 6,
    username: 'sentRequest1',
    fullName: 'Sent Request One',
    email: 'sentRequest1@example.com',
    avatar: 'https://github.com/shadcn.png',
  },
  {
    id: 7,
    username: 'sentRequest2',
    fullName: 'Sent Request Two',
    email: 'sentRequest2@example.com',
    avatar: 'https://github.com/shadcn.png',
  },
  // Добавьте другие отправленные запросы по аналогии
]

const courses: Course[] = [
  {
    id: 1,
    title: 'title 1',
    description: 'description 1',
  },
  {
    id: 2,
    title: 'title 2',
    description: 'description 2',
  },
  {
    id: 3,
    title: 'title 3',
    description: 'description 3',
  },
]

const FriendsList: React.FC<{ friends: IUser[] }> = ({ friends }) => {
  const handleRemoveFriend = (friendId: number) => {
    // Здесь должен быть запрос на сервер для удаления друга
    console.log(`Removing friend with id ${friendId}`)
  }

  const handleViewProfile = (friendId: number) => {
    // Здесь можно написать код для перехода на страницу профиля друга
    console.log(`Viewing profile of friend with id ${friendId}`)
  }

  return (
    <div>
      {friends.length === 0 ? (
        <p className='text-gray-500 text-center'>Список пуст</p>
      ) : (
        friends.map((friend) => (
          <div key={friend.id} className='flex items-center mb-4'>
            <Avatar className={'w-12 h-12 mr-4'}>
              <AvatarImage src={friend.avatar} />
              <AvatarFallback>{friend.username}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className='text-lg font-semibold'>{friend.fullName}</h2>
              <p className='text-gray-600'>Username: {friend.username}</p>
              <p className='text-gray-600'>{friend.email}</p>
              <button
                className='ml-2 text-red-500 hover:text-red-700'
                onClick={() => handleRemoveFriend(friend.id)}
              >
                Remove
              </button>
              <button
                className='ml-2 text-blue-500 hover:text-blue-700'
                onClick={() => handleViewProfile(friend.id)}
              >
                View Profile
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

// FriendRequests.tsx
const FriendRequests: React.FC<{ requests: IUser[] }> = ({ requests }) => {
  const handleAcceptRequest = (requestId: number) => {
    // Здесь должен быть запрос на сервер для принятия запроса в друзья
    console.log(`Accepting friend request with id ${requestId}`)
    // Реализуйте отправку запроса на сервер для принятия запроса в друзья
  }

  const handleDeclineRequest = (requestId: number) => {
    // Здесь должен быть запрос на сервер для отклонения запроса в друзья
    console.log(`Declining friend request with id ${requestId}`)
    // Реализуйте отправку запроса на сервер для отклонения запроса в друзья
  }

  return (
    <div>
      {requests.length === 0 ? (
        <p className='text-gray-500 text-center'>Список пуст</p>
      ) : (
        requests.map((request) => (
          <div key={request.id} className='flex items-center mb-4'>
            <Avatar className={'w-12 h-12 mr-4'}>
              <AvatarImage src={request.avatar} />
              <AvatarFallback>{request.username}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className='text-lg font-semibold'>{request.fullName}</h2>
              <p className='text-gray-600'>Username: {request.username}</p>
              <p className='text-gray-600'>{request.email}</p>
              <button
                className='mr-2 text-green-500 hover:text-green-700'
                onClick={() => handleAcceptRequest(request.id)}
              >
                Accept
              </button>
              <button
                className='mr-2 text-red-500 hover:text-red-700'
                onClick={() => handleDeclineRequest(request.id)}
              >
                Decline
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

// SentRequests.tsx
const SentRequests: React.FC<{ sentRequests: IUser[] }> = ({ sentRequests }) => {
  const handleCancelRequest = (requestId: number) => {
    // Здесь должен быть запрос на сервер для отмены отправленного запроса в друзья
    console.log(`Canceling friend request with id ${requestId}`)
  }

  return (
    <div>
      {sentRequests.length === 0 ? (
        <p className='text-gray-500 text-center'>Список пуст</p>
      ) : (
        sentRequests.map((request) => (
          <div key={request.id} className='flex items-center mb-4'>
            <Avatar className={'w-12 h-12 mr-4'}>
              <AvatarImage src={request.avatar} />
              <AvatarFallback>{request.username}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className='text-lg font-semibold'>{request.fullName}</h2>
              <p className='text-gray-600'>Username: {request.username}</p>
              <p className='text-gray-600'>{request.email}</p>
              <button
                className='text-red-500 hover:text-red-700'
                onClick={() => handleCancelRequest(request.id)}
              >
                Cancel Request
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

// CoursesList.tsx
const CoursesList: React.FC<{ courses: Course[] }> = ({ courses }) => {
  return (
    <div>
      <h3 className='text-xl font-bold mb-4'>Enrolled Courses</h3>
      {courses.length === 0 ? (
        <p className='text-gray-500 text-center'>Список курсов пуст</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {courses.map((course) => (
            <div key={course.id} className='bg-white p-4 rounded-lg shadow-md'>
              <h4 className='text-lg font-semibold'>{course.title}</h4>
              <p className='text-gray-600'>{course.description}</p>
              <NavLink
                to={`/courses/${course.id}`}
                className='mt-2 inline-block text-blue-500 hover:text-blue-700'
              >
                View Course
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const UserPage: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null)
  const [updatedUser, setUpdatedUser] = useState<IUser | null>(null)
  // const [courses, setCourses] = useState<Course[]>([])
  const [currentMainTab, setCurrentMainTab] = useState<MainTab>('friends')
  const [currentFriendsSubTab, setCurrentFriendsSubTab] =
    useState<FriendsSubTab>('friends')
  const [isOnline, setIsOnline] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const { isOpen, openModal, closeModal, ref } = useModal() // Используем наш хук для модального окна

  useEffect(() => {
    // Simulate fetching user data
    const userData: IUser = {
      id: 1,
      username: 'exampleUser',
      email: 'example@example.com',
      fullName: 'John Doe',
      avatar: 'https://github.com/shadcn.png',
      mobile: '1234567890',
      about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      courses: [1, 2, 3, 4, 5, 6, 7, 8],
    }
    setUser(userData)
    setUpdatedUser(userData)

    // Simulate online status change
    const onlineStatusTimer = setInterval(() => {
      setIsOnline((prevOnlineStatus) => !prevOnlineStatus)
    }, 5000)

    return () => clearInterval(onlineStatusTimer)
  }, [])

  const handleEditClick = () => {
    openModal()
  }

  const handleSave = () => {
    if (updatedUser) {
      setUser({ ...updatedUser })
      // Save updated user data (not implemented in this example)
    }
    closeModal() // Закрываем модальное окно при сохранении
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (updatedUser) {
      setUpdatedUser({
        ...updatedUser,
        [e.target.name]: e.target.value,
      })
    }
  }

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value)
    if (updatedUser) {
      setUpdatedUser({
        ...updatedUser,
        mobile: value,
      })
    }
  }

  const handleMainTabChange = (tab: MainTab) => {
    setCurrentMainTab(tab)
  }

  const handleFriendsSubTabChange = (tab: FriendsSubTab) => {
    setCurrentFriendsSubTab(tab)
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div
        className='bg-gray-100 shadow-lg rounded-lg overflow-hidden w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12 relative p-8 mt-20 lg:mt-[-150px] xl:mt-0'
        style={{ marginTop: '-180px' }}
      >
        {user ? (
          <>
            <div className='flex items-center mb-4'>
              <div className='relative'>
                <Avatar className={'w-16 h-16 mr-4'}>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.username}</AvatarFallback>
                </Avatar>
                <div
                  className={`absolute bottom-0 right-4 w-4 h-4 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-500'} border-2 border-white`}
                />
              </div>
              <div>
                <h2 className='text-2xl font-bold'>{user.fullName}</h2>
                <p className='text-gray-600'>
                  <b>Никнейм:</b> {user.username}
                </p>
                <p className='text-gray-600'>
                  <b>e-mail:</b> {user.email}
                </p>
                <p className='text-gray-600'>
                  <b>телефон: </b>
                  {user.mobile}
                </p>
              </div>
            </div>
            <hr className='my-4 border-t border-gray-300' />
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded'
              onClick={handleEditClick}
            >
              Edit Profile
            </button>
            <div className='mt-4'>
              <h3 className='text-xl font-bold mb-2'>Обо мне:</h3>
              <p className='text-gray-600'>{user.about}</p>
            </div>
            <div className='mt-8'>
              <div className='flex justify-between items-center mb-4'>
                <button
                  className={`px-4 py-2 rounded ${currentMainTab === 'friends' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
                  onClick={() => handleMainTabChange('friends')}
                >
                  Friends
                </button>
                <button
                  className={`px-4 py-2 rounded ${currentMainTab === 'courses' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
                  onClick={() => handleMainTabChange('courses')}
                >
                  Курсы
                </button>
              </div>
              {currentMainTab === 'friends' && (
                <div className='mb-4'>
                  <div className='flex justify-between items-center'>
                    <button
                      className={`px-4 py-2 rounded ${currentFriendsSubTab === 'friends' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
                      onClick={() => handleFriendsSubTabChange('friends')}
                    >
                      Друзья
                    </button>
                    <button
                      className={`px-4 py-2 rounded ${currentFriendsSubTab === 'requests' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
                      onClick={() => handleFriendsSubTabChange('requests')}
                    >
                      Запросы в друзья
                    </button>
                    <button
                      className={`px-4 py-2 rounded ${currentFriendsSubTab === 'sentRequests' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
                      onClick={() => handleFriendsSubTabChange('sentRequests')}
                    >
                      Отправленные запросы
                    </button>
                  </div>
                  {currentFriendsSubTab === 'friends' && (
                    <FriendsList friends={friendsData} />
                  )}
                  {currentFriendsSubTab === 'requests' && (
                    <FriendRequests requests={requestsData} />
                  )}
                  {currentFriendsSubTab === 'sentRequests' && (
                    <SentRequests sentRequests={sentRequestsData} />
                  )}
                </div>
              )}
              {currentMainTab === 'courses' && <CoursesList courses={courses} />}
            </div>
          </>
        ) : (
          <p className='p-8'>Загрузка...</p>
        )}
      </div>
      {isOpen && (
        <div className='fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center'>
          <div
            ref={ref}
            className='bg-white p-8 rounded shadow-lg w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12'
          >
            <h2 className='text-2xl font-bold mb-4'>Редактировать профиль</h2>
            <div className='mb-4'>
              <label htmlFor='fullName' className='block text-sm font-medium'>
                ФИО
              </label>
              <input
                type='text'
                id='fullName'
                name='fullName'
                onChange={handleChange}
                placeholder={'Введите ФИО'}
                className='w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 pl-2 lg:text-sm text-black border-black'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-sm font-medium'>
                e-mail
              </label>
              <input
                type='email'
                id='email'
                name='email'
                onChange={handleChange}
                placeholder={'Введите ФИО'}
                className='w-full  rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 pl-2 lg:text-sm text-black border-black lg:pl-2 lg:pt-4'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='mobile' className='block text-sm font-medium'>
                Мобильный телефон
              </label>
              <PhoneInput
                country={'ru'}
                onChange={handlePhoneChange}
                placeholder={'Введите ФИО'}
                inputClass='w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 pl-2 lg:text-sm text-black border lg:pl-2 lg:pt-4'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='about' className='block text-sm font-medium'>
                Обо мне
              </label>
              <textarea
                id='about'
                name='about'
                onChange={handleChange}
                placeholder={'Введите ФИО'}
                className='w-full h-24  rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm lg:text-sm text-black border-red-300 lg:pl-4 lg:pt-1'
              />
            </div>
            <div className='flex justify-end'>
              <button
                className='bg-blue-500 text-white px-4 py-2 rounded mr-2'
                onClick={handleSave}
              >
                Сохранить
              </button>
              <button
                className='bg-gray-300 text-gray-800 px-4 py-2 rounded'
                onClick={closeModal}
              >
                Отменить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserPage
