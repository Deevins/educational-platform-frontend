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
import RegisterPage from '@/pages/auth/RegisterPage.tsx'
import LoginPage from '@/pages/auth/LoginPage.tsx'
import AuthPage from '@/pages/auth/AuthPage.tsx'
import TermsOfServicePage from '@/pages/TermsOfServicePage.tsx'
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage.tsx'
import CoursesSearchPage from '@/pages/CoursesSearchPage.tsx'
import UserCoursesPage from '@/pages/UserCoursesPage.tsx'
import ThreadCreationPage from '@/pages/ThreadCreationPage.tsx'
import ProfilesSearchPage from '@/pages/ProfilesSearchPage.tsx'
import LogOutPage from '@/pages/auth/LogOutPage.tsx'

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
        path: '/forum/create/thread',
        element: <ThreadCreationPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/profiles',
        element: <ProfilesListPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/profiles/search',
        element: <ProfilesSearchPage />,
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
        path: '/profiles/:profileID',
        element: <ProfilePage />,
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
