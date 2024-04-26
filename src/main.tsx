import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { NotFoundPage } from '@/pages/404.tsx'
import { IndexPage } from '@/pages'
import CoursesPage from '@/pages/CoursesPage.tsx'
import ForumPage from '@/pages/ForumPage.tsx'
import ProfilesListPage from '@/pages/ProfilesListPage.tsx'
import MainPage from '@/pages/MainPage.tsx'
import CoursePage from '@/pages/CoursePage.tsx'
import ThreadPage from '@/pages/ThreadPage.tsx'
import ProfilePage from '@/pages/ProfilePage.tsx'
import RegistrationPage from '@/pages/auth/RegistrationPage.tsx'
import LoginPage from '@/pages/auth/LoginPage.tsx'
import AuthPage from '@/pages/auth/AuthPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <MainPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/courses',
        element: <CoursesPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/courses/:courseID',
        element: <CoursePage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/forum',
        element: <ForumPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/forum/threads/:threadID',
        element: <ThreadPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/profiles',
        element: <ProfilesListPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/profiles/:profileID',
        element: <ProfilePage />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
  {
    path: '/auth/',
    element: <AuthPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'register',
        element: <RegistrationPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
