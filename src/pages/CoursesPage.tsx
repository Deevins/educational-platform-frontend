import React from 'react'
import CoursesList, { ICourse } from '@/components/CoursesList.tsx'

const coursesData: ICourse[] = [
  {
    id: 1,
    title: 'React Hooks',
    author: 'John Doe',
    description: 'Learn React hooks for state management and effects',
    tags: ['React', 'JavaScript'],
    color: 'blue',
  },
  {
    id: 2,
    title: 'TypeScript Fundamentals',
    author: 'Jane Smith',
    description: 'Master TypeScript basics and advanced features',
    tags: ['TypeScript'],
    color: 'green',
  },
  {
    id: 3,
    title: 'Responsive Web Design',
    author: 'Alice Johnson',
    description: 'Build responsive and mobile-first web applications',
    tags: ['CSS', 'HTML'],
    color: 'yellow',
  },
  {
    id: 4,
    title: 'Advanced CSS Techniques',
    author: 'Bob Brown',
    description: 'Explore advanced CSS concepts and techniques',
    tags: ['CSS'],
    color: 'purple',
  },
  {
    id: 5,
    title: 'React Hooks',
    author: 'John Doe',
    description: 'Learn React hooks for state management and effects',
    tags: ['React', 'JavaScript'],
    color: 'blue',
  },
  {
    id: 6,
    title: 'TypeScript Fundamentals',
    author: 'Jane Smith',
    description: 'Master TypeScript basics and advanced features',
    tags: ['TypeScript'],
    color: 'sky',
  },
  {
    id: 7,
    title: 'Responsive Web Design',
    author: 'Alice Johnson',
    description: 'Build responsive and mobile-first web applications',
    tags: ['CSS', 'HTML'],
    color: 'red',
  },
  {
    id: 8,
    title: 'Advanced CSS Techniques',
    author: 'Bob Brown',
    description: 'Explore advanced CSS concepts and techniques',
    tags: ['CSS'],
    color: 'orange',
  },
  {
    id: 9,
    title: 'React Hooks',
    author: 'John Doe',
    description: 'Learn React hooks for state management and effects',
    tags: ['React', 'JavaScript'],
    color: 'blue',
  },
  {
    id: 10,
    title: 'TypeScript Fundamentals',
    author: 'Jane Smith',
    description: 'Master TypeScript basics and advanced features',
    tags: ['TypeScript'],
    color: 'teal',
  },
  {
    id: 11,
    title: 'Responsive Web Design',
    author: 'Alice Johnson',
    description: 'Build responsive and mobile-first web applications',
    tags: ['CSS', 'HTML'],
    color: 'yellow',
  },
  {
    id: 12,
    title: 'Advanced CSS Techniques',
    author: 'Bob Brown',
    description: 'Explore advanced CSS concepts and techniques',
    tags: ['CSS'],
    color: 'purple',
  },
]

const CoursesPage: React.FC = () => {
  return (
    <div className={'min-h-screen'}>
      <CoursesList courses={coursesData} />;
    </div>
  )
}

export default CoursesPage
