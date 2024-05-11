import ReactDOM from 'react-dom/client'

import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { NotFoundPage } from '@/pages/404.tsx'
import CoursesPage from '@/pages/CoursesPage.tsx'
import ForumPage from '@/pages/forum/ForumPage.tsx'
import ProfilesListPage from '@/pages/ProfilesListPage.tsx'
import MainPage from '@/pages/MainPage.tsx'
import ThreadPage from '@/pages/forum/ThreadPage.tsx'
import RegisterPage from '@/pages/auth/RegisterPage.tsx'
import LoginPage from '@/pages/auth/LoginPage.tsx'
import AuthPage from '@/pages/auth/AuthPage.tsx'
import TermsOfServicePage from '@/pages/TermsOfServicePage.tsx'
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage.tsx'
import CoursesSearchPage from '@/pages/CoursesSearchPage.tsx'
import UserCoursesPage from '@/pages/UserCoursesPage.tsx'
import LogOutPage from '@/pages/auth/LogOutPage.tsx'
import UserProfilePage from '@/pages/UserProfilePage.tsx'
import FirstTimeInstructorPage from '@/pages/FirstTimeInstructorPage.tsx'
import { IndexPage } from '@/pages'
import InstructorOnboardingPage from '@/pages/instructor/InstructorOnboardingPage.tsx'
import InstructorCoursesPage from '@/pages/instructor/InstructorCoursesPage.tsx'
import IndexInstructorPage from '@/pages/instructor/IndexInstructorPage.tsx'
import CourseBaseCreationPage from '@/pages/course-creation/CourseBaseCreationPage.tsx'
import CourseEnhanceWithInfoPage from '@/pages/course-creation/CourseEnhanceWithInfoPage.tsx'
import IndexCourseEnhancePage from '@/pages/course-creation/IndexCourseEnhancePage.tsx'
import CourseStructurePage from '@/pages/course-creation/CourseStructurePage.tsx'
import VideoSetupPage from '@/pages/course-creation/VideoSetupPage.tsx'
import FilmPage from '@/pages/course-creation/FilmPage.tsx'
import AccessibilityPage from '@/pages/course-creation/AccessibilityPage.tsx'
import BasicsPage from '@/pages/course-creation/BasicsPage.tsx'
import CourseMessagesPage from '@/pages/course-creation/CourseMessagesPage.tsx'
import CurriculumPage from '@/pages/course-creation/curriculum/CurriculumPage.tsx'
import SettingsPage from '@/pages/course-creation/SettingsPage.tsx'
import { NotificationProvider } from '@/utils/contexts/notificationContext.tsx'
import CoursesSearchByCategory from '@/pages/CoursesSearchByCategory.tsx'
import UnregisteredCoursePage from '@/pages/unregistered-course-page/UnregisteredCoursePage.tsx'
import InstructorNewcomerPage from '@/pages/instructor/InstructorNewcomerPage.tsx'
import CourseActivePage from '@/pages/course-learning/CourseActivePage.tsx'

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
        path: '/users/user/:userID/profile',
        element: <UserProfilePage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/forum/threads/thread/:threadID',
        element: <ThreadPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/courses/course/:courseID',
        element: <UnregisteredCoursePage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/teaching',
        element: <FirstTimeInstructorPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/course-creation/learning-objectives', // TODO: optional, mb forum for instructors
        element: <PrivacyPolicyPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/courses/:categoryID',
        element: <CoursesSearchByCategory />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/courses/:categoryID/:subcategoryID',
        element: <CoursesSearchByCategory />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/courses/:categoryID/:subcategoryID',
        element: <CoursesSearchByCategory />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
  {
    path: '/courses/course/:courseID/learn/',
    element: <CourseActivePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/teaching/onboarding/teaching-experience',
    element: <InstructorOnboardingPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/instructor/',
    element: <IndexInstructorPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'courses',
        element: <InstructorCoursesPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: 'newcomer',
        element: <InstructorNewcomerPage />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
  {
    path: '/instructor/course/create',
    element: <CourseBaseCreationPage />,
    errorElement: <NotFoundPage />,
  },

  {
    path: '/instructor/courses/course/:courseID/manage/', // после manage различные разделы редактирования курса
    element: <IndexCourseEnhancePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'goals', // после manage различные разделы редактирования курса
        element: <CourseEnhanceWithInfoPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: 'course-structure', // после manage различные разделы редактирования курса
        element: <CourseStructurePage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: 'video-setup', // после manage различные разделы редактирования курса
        element: <VideoSetupPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: 'film', // после manage различные разделы редактирования курса
        element: <FilmPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: 'curriculum', // после manage различные разделы редактирования курса
        element: <CurriculumPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: 'accessibility', // после manage различные разделы редактирования курса
        element: <AccessibilityPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: 'basics', // после manage различные разделы редактирования курса
        element: <BasicsPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: 'messages', // Сообщения курса
        element: <CourseMessagesPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: 'settings', // Сообщения курса
        element: <SettingsPage />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
  {
    path: '/teaching/test-video',
    element: <div>test video</div>,
    errorElement: <NotFoundPage />,
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

  // {
  //   path: '/courses/course/:courseID/learn/:elementType/:elementID',
  //   element: <CourseActivePage />,
  //   errorElement: <NotFoundPage />,
  // },
  // {
  //   path: '/courses/course/:courseID/learn/quiz/:quizID',
  //   element: <CourseActivePage />,
  //   errorElement: <NotFoundPage />,
  // },
])

// TODO: mb implement
// { label: 'Моя страница', to: '/my-page' },
// { label: 'Настройки', to: '/settings' },
// { label: 'Подписки', to: '/subscriptions' },
// { label: 'Избранное', to: '/favorites' },
// { label: 'Друзья', to: '/friends' },
// { label: 'Сообщения', to: '/messages' },
// { label: 'Выйти', to: '/auth/logout', onClick: logout },
ReactDOM.createRoot(document.getElementById('root')!).render(
  <NotificationProvider>
    <RouterProvider router={router} />
  </NotificationProvider>
)
