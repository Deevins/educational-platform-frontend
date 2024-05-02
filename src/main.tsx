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
import RegisterPage from '@/pages/auth/RegisterPage.tsx'
import LoginPage from '@/pages/auth/LoginPage.tsx'
import AuthPage from '@/pages/auth/AuthPage.tsx'
import TermsOfServicePage from '@/pages/TermsOfServicePage.tsx'
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage.tsx'
import CoursesSearchPage from '@/pages/CoursesSearchPage.tsx'
import UserCoursesPage from '@/pages/UserCoursesPage.tsx'
import LogOutPage from '@/pages/auth/LogOutPage.tsx'
import UserProfilePage from '@/pages/UserProfilePage.tsx'
import TeachingPage from '@/pages/TeachingPage.tsx'

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
        path: '/courses/all',
        element: <CoursesPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/courses/search',
        element: <CoursesSearchPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/courses/my',
        element: <UserCoursesPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/forum',
        element: <ForumPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/users',
        element: <ProfilesListPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/terms-of-service',
        element: <TermsOfServicePage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/privacy',
        element: <PrivacyPolicyPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/users/:userID',
        element: <UserProfilePage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/forum/threads/:threadID',
        element: <ThreadPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/courses/:courseID',
        element: <CoursePage />,
        errorElement: <NotFoundPage />,
      },
      { path: '/teaching', element: <TeachingPage />, errorElement: <NotFoundPage /> },
    ],
  },
  {
    path: '/auth/',
    element: <AuthPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'register',
        element: <RegisterPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: 'logout',
        element: <LogOutPage />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
])
// { label: 'Моя страница', to: '/my-page' },
// { label: 'Настройки', to: '/settings' },
// { label: 'Подписки', to: '/subscriptions' },
// { label: 'Избранное', to: '/favorites' },
// { label: 'Друзья', to: '/friends' },
// { label: 'Сообщения', to: '/messages' },
// { label: 'Выйти', to: '/auth/logout', onClick: logout },
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
