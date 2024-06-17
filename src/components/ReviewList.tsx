import React, { useState } from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

export interface Review {
  full_name: string
  avatar_url: string
  review_text: string
  created_at: string
  rating: number
}

export const computeRatingDistribution = (reviews: Review[]) => {
  const total = reviews.length
  const countPerStar = Array(5).fill(0) // Five star rating system

  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      countPerStar[review.rating - 1]++
    }
  })

  const percentages = countPerStar.map((count) => (count / total) * 100)
  return percentages.reverse() // Since we want 5-stars first
}

export const averageRating = (reviews: Review[]) => {
  const total = reviews.reduce((acc, review) => acc + review.rating, 0)
  return (total / reviews.length).toFixed(1)
}

export interface ReviewListProps {
  reviews: Review[]
}

const generateStars = (rating: number) => {
  const maxStars = 5
  const filledStars = '★'.repeat(rating)
  const emptyStars = '☆'.repeat(maxStars - rating)
  return (
    <span className='text-yellow-400'>
      {filledStars}
      <span className='text-gray-300'>{emptyStars}</span>
    </span>
  )
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const reviewsPerPage = 5

  const sortReviews = (order: 'asc' | 'desc') => {
    setSortOrder(order)
  }

  if (reviews === null || reviews.length === 0) {
    return <div>No reviews yet</div>
  }

  const sortedReviews = [...reviews].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime()
    const dateB = new Date(b.created_at).getTime()
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
  })

  const indexOfLastReview = currentPage * reviewsPerPage
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage
  const currentReviews = sortedReviews.slice(indexOfFirstReview, indexOfLastReview)
  const totalPages = Math.ceil(reviews.length / reviewsPerPage)

  return (
    <div>
      <div className='mb-4 flex space-x-4 w-[40%]'>
        <button
          className={`px-4 py-2 bg-gray-500 text-white rounded ${sortOrder === 'asc' ? 'opacity-30' : ''}`}
          onClick={() => sortReviews('asc')}
        >
          Сортировать от старых к новым
        </button>
        <button
          className={`px-4 py-2 bg-gray-500 text-white rounded ${sortOrder === 'desc' ? 'opacity-30' : ''}`}
          onClick={() => sortReviews('desc')}
        >
          Сортировать от новых к старым
        </button>
      </div>
      {currentReviews.map((review) => (
        <div
          key={Math.random() * 100 * Math.exp(2)}
          className='mb-4 p-4 border-b last:border-b-0'
        >
          <div className='flex items-center space-x-4'>
            <div className='font-semibold'>{review.full_name}</div>
            <div className='text-gray-500 text-sm'>
              {formatDistanceToNow(parseISO(review.created_at), {
                addSuffix: true,
                locale: ru,
              })}
            </div>
          </div>
          <div className='flex items-center mt-1'>
            {generateStars(review.rating)}
            <div className='text-sm text-gray-500 ml-2'>{review.rating.toFixed(1)}</div>
          </div>
          <p className='mt-2 text-gray-800'>{review.review_text}</p>
        </div>
      ))}
      <div className='flex items-center justify-center'>
        <div className='flex space-x-2 mt-4'>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 border rounded ${index + 1 === currentPage ? 'bg-gray-500 text-white' : 'bg-white text-black'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
