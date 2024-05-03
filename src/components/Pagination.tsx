import React from 'react'

interface PaginationProps {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  onClick: (pageNumber: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onClick,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav className='mt-4 flex justify-center'>
      <ul className='pagination flex'>
        {pages.map((page) => (
          <li key={page} className='mx-1'>
            <button
              className={`${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-800'
              } px-4 py-2 rounded`}
              onClick={() => onClick(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination
