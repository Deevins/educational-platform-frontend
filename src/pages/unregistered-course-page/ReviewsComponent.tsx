import React, { useState } from 'react'

interface Review {
  id: number
  name: string
  date: string
  content: string
  rating: number
}

export const ReviewsComponent: React.FC = () => {
  const ratingsDistribution = computeRatingDistribution(reviews)
  const avgRating = averageRating(reviews)

  return (
    <div className='max-w-8xl p-6 bg-white rounded-lg shadow'>
      <h2 className='text-2xl font-bold mb-4'>Отзывы студентов</h2>
      <RatingSummary averageRating={avgRating} distribution={ratingsDistribution} />
      <ReviewList reviews={reviews} />
    </div>
  )
}

const reviews: Review[] = [
  // Example reviews
  {
    id: 1,
    name: 'Myroslava S.',
    date: '8 months ago',
    content: 'Хороший курс! Точно.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Mikhail',
    date: '8 months ago',
    content: 'Всё предельно понятно',
    rating: 5,
  },
  {
    id: 3,
    name: 'Юрий Сергеевич',
    date: '2 years ago',
    content: 'Спасибо за курс! Очень понравился...',
    rating: 4,
  },
  {
    id: 4,
    name: 'Myroslava S.',
    date: '8 months ago',
    content: 'Хороший курс! Точно.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Mikhail',
    date: '8 months ago',
    content: 'Всё предельно понятно',
    rating: 5,
  },
  {
    id: 6,
    name: 'Юрий Сергеевич',
    date: '2 years ago',
    content: 'Спасибо за курс! Очень понравился...',
    rating: 4,
  },
  {
    id: 7,
    name: 'Myroslava S.',
    date: '8 months ago',
    content: 'Хороший курс! Точно.',
    rating: 5,
  },
  {
    id: 8,
    name: 'Mikhail',
    date: '8 months ago',
    content: 'Всё предельно понятно',
    rating: 5,
  },
  {
    id: 9,
    name: 'Юрий Сергеевич',
    date: '2 years ago',
    content: 'Спасибо за курс! Очень понравился...',
    rating: 4,
  },
  {
    id: 11,
    name: 'Myroslava S.',
    date: '8 months ago',
    content: 'Хороший курс! Точно.',
    rating: 5,
  },
  {
    id: 13,
    name: 'Mikhail',
    date: '8 months ago',
    content: 'Всё предельно понятно',
    rating: 5,
  },
  {
    id: 14,
    name: 'Юрий Сергеевич',
    date: '2 years ago',
    content: 'Спасибо за курс! Очень понравился...',
    rating: 4,
  },
]

const computeRatingDistribution = (reviews: Review[]) => {
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

const averageRating = (reviews: Review[]) => {
  const total = reviews.reduce((acc, review) => acc + review.rating, 0)
  return (total / reviews.length).toFixed(1)
}

interface ReviewListProps {
  reviews: Review[]
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  const [visibleCount, setVisibleCount] = useState(10)

  const loadMoreReviews = () => {
    setVisibleCount((currentCount) => currentCount + 10)
  }

  return (
    <div>
      {reviews.slice(0, visibleCount).map((review) => (
        <div key={review.id} className='mb-4 p-4 border-b last:border-b-0'>
          <div className='flex items-center space-x-4'>
            <div className='font-semibold'>{review.name}</div>
            <div className='text-gray-500 text-sm'>{review.date}</div>
          </div>
          <div className='flex items-center mt-1'>
            <div className='text-yellow-400'>
              {Array(review.rating).fill('★').join('')}
            </div>
            <div className='text-sm text-gray-500 ml-2'>{review.rating.toFixed(1)}</div>
          </div>
          <p className='mt-2 text-gray-800'>{review.content}</p>
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

interface RatingSummaryProps {
  averageRating: string
  distribution: number[] // This expects an array of percentages for 5 to 1 stars
}

const RatingSummary: React.FC<RatingSummaryProps> = ({ averageRating, distribution }) => {
  return (
    <div className='mb-6'>
      <div className='flex items-center mb-4'>
        <div className='text-4xl font-bold mr-4'>{averageRating}</div>
        <div className='w-full'>
          {distribution.map((percent, index) => (
            <div key={index} className='flex items-center mb-1'>
              <div className='w-8 text-right'>{5 - index}★</div>
              <div className='w-full bg-gray-200 rounded overflow-hidden ml-2'>
                <div className='bg-yellow-400 h-2' style={{ width: `${percent}%` }}></div>
              </div>
              <div className='ml-2 text-sm'>{percent.toFixed(0)}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
