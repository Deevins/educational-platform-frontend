import React from 'react'
import { NavLink, NavLinkProps, To } from 'react-router-dom'

interface Props {
  children: React.ReactNode
  to: To
  props?: NavLinkProps // Пропсы, которые могут прокидываться
}

export const CustomLink: React.FC<Props> = ({ children, to, props }) => {
  return (
    <NavLink
      to={to}
      {...props}
      className={({ isActive, isPending }) =>
        [isPending ? 'pending' : '', isActive ? 'underline font-medium' : ''].join(
          ' hover:text-[1.11rem] '
        )
      }
    >
      {children}
    </NavLink>
  )
}
