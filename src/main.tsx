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
import BasicsPage from '@/pages/course-creation/BasicsPage.tsx'
import CurriculumPage from '@/pages/course-creation/curriculum/CurriculumPage.tsx'
import SettingsPage from '@/pages/course-creation/SettingsPage.tsx'
import { NotificationProvider } from '@/utils/contexts/notificationContext.tsx'
import CoursesSearchByCategory from '@/pages/CoursesSearchByCategory.tsx'
import CoursePage from '@/pages/course-page/CoursePage.tsx'
import InstructorNewcomerPage from '@/pages/instructor/InstructorNewcomerPage.tsx'
import CourseActivePage from '@/pages/course-learning/CourseActivePage.tsx'
import InstructorCommunicationPage from '@/pages/instructor/InstructorCommunicationPage.tsx'
import { Provider } from 'react-redux'
import store from '@/utils/redux/store/store.ts'
import CoursesCheckList from '@/pages/CoursesCheckList.tsx'

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
        element: <CoursePage />,
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
        path: '/courses/check/',
        element: <CoursesCheckList />,
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
    path: '/courses/course/draft/:courseID/learn/', // same - need to let view only author
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
      {
        path: 'communication',
        element: <InstructorCommunicationPage />,
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
        path: 'basics', // после manage различные разделы редактирования курса
        element: <BasicsPage />,
        errorElement: <NotFoundPage />,
      },

      {
        path: 'settings',
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
  <Provider store={store}>
    <NotificationProvider>
      <RouterProvider router={router} />
    </NotificationProvider>
  </Provider>
)
