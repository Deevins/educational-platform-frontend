import React, { useRef, useState } from 'react'
import logo from '/platform_logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import AvatarMenu from '@/components/AvatarMenu.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Navbar } from '@/components/Navbar.tsx'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated, selectUserID } from '@/utils/redux/store/authSlice.ts'
import useSWR from 'swr'
import axios from 'axios'

interface UserExperience {
  has_used: boolean
}

const fetcher = (url: string) => axios.get<UserExperience>(url).then((res) => res.data)

const StudentHeader: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const userID = useSelector(selectUserID)
  const navigate = useNavigate()
  const { data } = useSWR(
    `http://localhost:8080/users/has-user-tried-instructor/${userID}`,
    fetcher
  )

  const [isInstructorModeOpen, setIsInstructorModeOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  const openInstructorMode = () => {
    setIsHovered(true)
    setIsInstructorModeOpen(true)
  }

  const closeStudentMode = () => {
    setIsHovered(false)
    setIsInstructorModeOpen(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsInstructorModeOpen(false)
  }

  // const fetchCategories = async (): Promise<Category[]> => {
  //   try {
  //     const response = await axios.get<Category[]>(
  //       'http://localhost:8080/directories/categories'
  //     )
  //     return response.data
  //   } catch (error) {
  //     console.error('Error fetching categories', error)
  //     return []
  //   }
  // }
  //
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const categories = await fetchCategories()
  //     setCategories(categories)
  //   }
  //
  //   fetchData()
  // }, [])

  const handleClickInstructor = async () => {
    if (!data?.has_used) {
      try {
        const result = await axios.post(
          `http://localhost:8080/users/set-has-user-tried-instructor-to-true/${userID}`
        )
        console.log('result', result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      navigate('/teaching')
    }
  }

  const final_route = data?.has_used ? '/instructor/courses' : '/teaching'
  return (
    <header className='bg-gray-200 text-black p-4 flex justify-center  lg:justify-between items-center shadow-xl'>
      <NavLink to={'/'} className='hidden lg:flex items-center sm:hidden'>
        <Avatar className={'hover:scale-105'}>
          <AvatarImage src={logo} />
          <AvatarFallback>Логотип</AvatarFallback>
        </Avatar>
        <h1 className='text-lg font-bold'>ProdigyPath</h1>
      </NavLink>
      {/*<div className={'lg:mr-[10%]'}>*/}
      {/*  <Dropdown />*/}
      {/*</div>*/}

      <div className='text-center flex justify-center space-x-4 lg:mr-[5%]'>
        <Navbar />
      </div>

      <div className=' flex items-center'>
        <div
          className='relative flex text-center'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <NavLink
            to={final_route}
            className='text-black rounded-lg px-4 py-2 mr-4 transition duration-200 hover:bg-gray-100 hover:cursor-pointer hover:text-purple-700 z-50'
          >
            <button onMouseEnter={openInstructorMode} onClick={handleClickInstructor}>
              Преподаватель
            </button>
          </NavLink>
          <div ref={dialogRef}>
            {isHovered && isInstructorModeOpen && (
              <div
                className='absolute left-0 mt-8 w-full lg:w-64 bg-white border border-gray-300 rounded-lg shadow-lg'
                onMouseLeave={closeStudentMode}
                style={{ top: 'calc(20% + 8px)', left: '-30px' }}
              >
                <div className='p-4 flex text-center flex-col'>
                  <p className='text-mb font-bold mb-2 '>
                    Переключитесь в режим преподавателя
                  </p>
                  <p>Превратите свои знания в возможность и учите людей по всему миру.</p>
                  <NavLink
                    to={final_route}
                    className='block bg-black text-white rounded-lg px-4 py-2 mt-4 ml-2hover:bg-gray-800 mr-1'
                  >
                    Узнать подробнее
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>
        {isAuthenticated ? (
          <AvatarMenu />
        ) : (
          <div className={'flex mt-2 lg:mt-0'}>
            <NavLink to={'/auth/login'}>
              <Button className='bg-gray-50 text-black rounded-lg px-4 py-2 mr-4 transition duration-200 hover:bg-gray-300 hover:cursor-pointer'>
                Войти
              </Button>
            </NavLink>
            <NavLink to={'/auth/register'}>
              <Button className='bg-gray-50 text-black rounded-lg px-4 py-2 mr-4 transition duration-200 hover:bg-gray-300'>
                Зарегистрироваться
              </Button>
            </NavLink>
          </div>
        )}
      </div>
    </header>
  )
}
export default StudentHeader

// interface Category {
//   label: string
//   url: string
//   subcategories: { label: string; url: string }[]
// }

// TODO: stub, replace with real data from API


// const Dropdown: React.FC = () => {
//   const [activeCategory, setActiveCategory] = useState<string | null>(null)
//   const [isVisible, setIsVisible] = useState(false)
//   const dropdownRef = useRef<HTMLDivElement>(null)
//   const leaveTimeout = useRef<NodeJS.Timeout | null>(null)
//
//   const handleMouseEnter = () => {
//     if (leaveTimeout.current) {
//       clearTimeout(leaveTimeout.current) // Clear timeout if mouse re-enters
//       leaveTimeout.current = null
//     }
//     setIsVisible(true)
//   }
//
//   const handleMouseLeave = () => {
//     leaveTimeout.current = setTimeout(() => {
//       setIsVisible(false)
//       setActiveCategory(null)
//       leaveTimeout.current = null
//     }, 200)
//   }
//
//   return (
//     <div ref={dropdownRef} className='relative'>
//       <button
//         onMouseOver={handleMouseEnter}
//         onMouseOut={handleMouseLeave}
//         className='bg-gray-200 px-4 py-2 rounded-lg'
//       >
//         Категории
//       </button>
//       {isVisible && (
//         <div
//           className='absolute left-0 mt-2 bg-white shadow-lg border rounded-lg w-48 z-50'
//           onMouseOver={handleMouseEnter}
//           onMouseOut={handleMouseLeave}
//         >
//           {categories.map((category) => (
//             <div
//               key={category.url}
//               className='px-4 py-2 hover:bg-gray-100'
//               onMouseOver={() => setActiveCategory(category.url)}
//             >
//               <NavLink
//                 to={`/courses/${category.url}`}
//                 className='block text-black hover:text-blue-600'
//               >
//                 {category.label}
//               </NavLink>
//               {activeCategory === category.url && (
//                 <div className='absolute left-full top-0 mt-0 ml-1 bg-white shadow-lg border rounded-lg w-48'>
//                   {category.subcategories.map((subcategory) => (
//                     <NavLink
//                       key={subcategory.url}
//                       to={`/courses/${category.url}/${subcategory.url}`}
//                       className='block px-4 py-2 hover:bg-gray-100 text-black hover:text-blue-600'
//                     >
//                       {subcategory.label}
//                     </NavLink>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }
