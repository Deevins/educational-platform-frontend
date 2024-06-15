import React, { useState } from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

export interface Review {
  full_name: string
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

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  const [visibleCount, setVisibleCount] = useState(10)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const loadMoreReviews = () => {
    setVisibleCount((currentCount) => currentCount + 10)
  }

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

  return (
    <div>
      <div className='mb-4 flex space-x-4 w-[40%]'>
        <button
          className={`px-4 py-2 bg-gray-500 text-white rounded ${sortOrder === 'asc' ? 'opacity-50' : ''}`}
          onClick={() => sortReviews('asc')}
        >
          Сортировать от старых к новым
        </button>
        <button
          className={`px-4 py-2 bg-gray-500 text-white rounded ${sortOrder === 'desc' ? 'opacity-50' : ''}`}
          onClick={() => sortReviews('desc')}
        >
          Сортировать от новых к старым
        </button>
      </div>
      {sortedReviews.slice(0, visibleCount).map((review) => (
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
            <div className='text-yellow-400'>
              {Array(review.rating).fill('★').join('')}
            </div>
            <div className='text-sm text-gray-500 ml-2'>{review.rating.toFixed(1)}</div>
          </div>
          <p className='mt-2 text-gray-800'>{review.review_text}</p>
        </div>
      ))}
      <div className={'flex items-center justify-center'}>
        {visibleCount < reviews.length && (
          <button
            onClick={loadMoreReviews}
            className='mt-4 px-6 py-2 text-black border-2 border-black  transition duration-300'
          >
            Load More Reviews
          </button>
        )}
      </div>
    </div>
  )
}
