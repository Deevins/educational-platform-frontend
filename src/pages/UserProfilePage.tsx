import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@radix-ui/themes'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'

interface User {
  id: number
  username: string
  email: string
  fullName: string
  avatar: string
  mobile: string
  about: string
  courses: number[]
}

interface Course {
  id: number
  title: string
  description: string
}

const UserPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [updatedUser, setUpdatedUser] = useState<User | null>(null)
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    // Assume coursesData is an array of Course objects fetched from somewhere
    const coursesData: Course[] = [
      { id: 1, title: 'Course 1', description: 'Description for Course 1' },
      { id: 2, title: 'Course 2', description: 'Description for Course 2' },
      { id: 3, title: 'Course 3', description: 'Description for Course 3' },
      { id: 4, title: 'Course 4', description: 'Description for Course 4' },
      { id: 5, title: 'Course 5', description: 'Description for Course 5' },
      { id: 6, title: 'Course 6', description: 'Description for Course 6' },
      { id: 7, title: 'Course 7', description: 'Description for Course 7' },
      { id: 8, title: 'Course 8', description: 'Description for Course 8' },
    ]
    setCourses(coursesData)

    // Simulate fetching user data
    const userData: User = {
      id: 1,
      username: 'exampleUser',
      email: 'example@example.com',
      fullName: 'John Doe',
      avatar: 'avatar-url',
      mobile: '1234567890',
      about:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod suscipit lectus, at cursus velit.',
      courses: [1, 2, 3, 4, 5, 6, 7, 8],
    }
    setUser(userData)
    setUpdatedUser(userData)
  }, [])

  const handleEditClick = () => {
    setIsEditing(true)
    document.body.style.overflow = 'hidden' // блокируем прокрутку фона
  }

  const handleSave = () => {
    if (updatedUser) {
      console.log(`user updated ${updatedUser}`)
      setUser({ ...updatedUser })
      // Save updated user data (not implemented in this example)
    }
    setIsEditing(false)
    document.body.style.overflow = '' // разблокируем прокрутку фона
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (updatedUser) {
      setUpdatedUser({
        ...updatedUser,
        [e.target.name]: e.target.value,
      })
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-200'>
      <div className='bg-gray-100 shadow-lg rounded-lg overflow-hidden w-11/12 lg:w-2/3 xl:w-1/2 relative p-8'>
        {user ? (
          <>
            <div className='flex items-center mb-4'>
              <Avatar className={'w-16 h-16 mr-4'}>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>{`${user?.username} avatar`}</AvatarFallback>
              </Avatar>

              <div>
                <h2 className='text-2xl font-bold'>{user.fullName}</h2>
                <p className='text-gray-600'>Username: {user.username}</p>
                <p className='text-gray-600'>{user.email}</p>
                <p className='text-gray-600'>{user.mobile}</p>
              </div>
            </div>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded'
              onClick={handleEditClick}
            >
              Edit Profile
            </button>
            <div className='mt-4'>
              <h3 className='text-xl font-bold mb-2'>About Me</h3>
              {isEditing ? (
                <p className='text-gray-600'>{updatedUser?.about}</p> // заменили textarea на p
              ) : (
                <p className='text-gray-600'>{user.about}</p>
              )}
            </div>
            {isEditing && (
              <div className='flex justify-end mt-4'>
                <button
                  className='bg-blue-500 text-white px-4 py-2 rounded mr-2'
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className='bg-gray-300 text-gray-800 px-4 py-2 rounded'
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            )}
            <div className='mt-8 overflow-auto'>
              <h3 className='text-xl font-bold mb-4'>Enrolled Courses</h3>
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
            </div>
          </>
        ) : (
          <p className='p-8'>Loading...</p>
        )}
        {isEditing && (
          <div className='fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center'>
            <div className='bg-white p-8 rounded shadow-lg w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3'>
              <h2 className='text-2xl font-bold mb-4'>Edit Profile</h2>
              <div className='mb-4'>
                <label htmlFor='fullName' className='block text-sm font-medium'>
                  Full Name
                </label>
                <input
                  type='text'
                  id='fullName'
                  name='fullName'
                  value={updatedUser?.fullName}
                  onChange={handleChange}
                  className='w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='email' className='block text-sm font-medium'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={updatedUser?.email}
                  onChange={handleChange}
                  className='w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='mobile' className='block text-sm font-medium'>
                  Mobile
                </label>
                <input
                  type='text'
                  id='mobile'
                  name='mobile'
                  value={updatedUser?.mobile}
                  onChange={handleChange}
                  className='w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='about' className='block text-sm font-medium'>
                  About Me
                </label>
                <textarea
                  id='about'
                  name='about'
                  value={updatedUser?.about}
                  onChange={handleChange}
                  className='w-full h-24 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
              <div className='flex justify-end'>
                <Button
                  className='bg-blue-500 text-white px-4 py-2 rounded mr-2'
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  className='bg-gray-300 text-gray-800 px-4 py-2 rounded'
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserPage
