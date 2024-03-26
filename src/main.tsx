import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { NotFoundPage } from '@/pages/404.tsx'
import { IndexPage } from '@/pages'
import CoursesPage from '@/pages/CoursesPage.tsx'
import ForumListPage from '@/pages/ForumListPage.tsx'
import ProfilesListPage from '@/pages/ProfilesListPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/courses',
        element: <CoursesPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/forum',
        element: <ForumListPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/profiles',
        element: <ProfilesListPage />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
  {},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
