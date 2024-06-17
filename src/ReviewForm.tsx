import React, { useState } from 'react'
import { Review } from '@/components/ReviewList.tsx'
import axios from 'axios'

interface ReviewFormProps {
  onReviewSubmitted: () => void
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onReviewSubmitted }) => {
  const [fullName, setFullName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState<number | null>(null)

  console.log("sdfopedrfkgdfiop'ghkjdf")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (rating === null || rating < 1 || rating > 5) {
      alert('Пожалуйста, выберите оценку от 1 до 5 звезд.')
      return
    }

    const newReview: Review = {
      full_name: fullName,
      avatar_url: avatarUrl,
      review_text: reviewText,
      created_at: new Date().toISOString(),
      rating,
    }

    try {
      const response = await axios.post('/api/reviews', newReview)
      if (response.status === 201) {
        onReviewSubmitted()
        setFullName('')
        setAvatarUrl('')
        setReviewText('')
        setRating(null)
      }
    } catch (error) {
      console.error('Error submitting review:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='p-4 border rounded mb-6'>
      <div className='mb-4'>
        <label className='block text-gray-700 mb-2'>Полное имя</label>
        <input
          type='text'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className='w-full px-4 py-2 border rounded'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 mb-2'>URL аватара</label>
        <input
          type='text'
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          className='w-full px-4 py-2 border rounded'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 mb-2'>Отзыв</label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className='w-full px-4 py-2 border rounded'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 mb-2'>Оценка</label>
        <select
          value={rating ?? ''}
          onChange={(e) => setRating(Number(e.target.value))}
          className='w-full px-4 py-2 border rounded'
          required
        >
          <option value='' disabled>
            Выберите оценку
          </option>
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>
              {star} звезд
            </option>
          ))}
        </select>
      </div>
      <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded'>
        Отправить отзыв
      </button>
    </form>
  )
}
