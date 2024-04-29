import React from 'react'
import { NavLink } from 'react-router-dom'

const ForumPage: React.FC = () => {
  return (
    <div>
      <p>Forum page</p>
      <NavLink to={'create/thread'} className={'bg-red-200'}>
        Create new thread
      </NavLink>
    </div>
  )
}

export default ForumPage
