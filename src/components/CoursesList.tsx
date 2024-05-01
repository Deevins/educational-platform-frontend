import React from 'react'

export interface ICourse {
  id: number
  title: string
  author: string
  description: string
  tags: string[]
  color: string
}

interface CourseCardProps {
  course: ICourse
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4'>
      <div
        className={`bg-${course.color}-100 rounded-lg shadow-md overflow-hidden border border-gray-200`}
      >
        <div className={`h-16 w-full bg-${course.color}-500`} />
        <div className='p-4'>
          <h2 className='text-lg font-semibold mb-2'>{course.title}</h2>
          <p className='text-sm mb-2'>{course.author}</p>
          <p className='text-sm text-gray-700'>{course.description}</p>
          <div className='mt-4'>
            {course.tags.map((tag, index) => (
              <span
                key={index}
                className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface FilterProps {
  tags: string[]
  selectedTags: string[]
  onChange: (selectedTags: string[]) => void
  onFilter: () => void
  onReset: () => void
}

const Filter: React.FC<FilterProps> = ({
  tags,
  selectedTags,
  onChange,
  onFilter,
  onReset,
}) => {
  const handleTagClick = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((selectedTag) => selectedTag !== tag)
      : [...selectedTags, tag]
    onChange(newSelectedTags)
  }

  return (
    <div className='my-4'>
      {tags.map((tag, index) => (
        <button
          key={index}
          className={`bg-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 mr-2 mb-2 ${
            selectedTags.includes(tag) ? 'bg-blue-500 text-white' : ''
          }`}
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </button>
      ))}
      <button
        className='bg-blue-500 text-white rounded-full px-4 py-2 text-sm font-semibold mr-2 mb-2'
        onClick={onFilter}
      >
        Filter
      </button>
      <button
        className='bg-gray-500 text-white rounded-full px-4 py-2 text-sm font-semibold mb-2'
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  )
}

interface CoursesPageProps {
  courses: ICourse[]
}

const CoursesList: React.FC<CoursesPageProps> = ({ courses }) => {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([])
  const [filteredCourses, setFilteredCourses] = React.useState<ICourse[]>(courses)

  const handleFilter = () => {
    const newFilteredCourses =
      selectedTags.length === 0
        ? courses
        : courses.filter((course) =>
            course.tags.some((tag) => selectedTags.includes(tag))
          )
    setFilteredCourses(newFilteredCourses)
  }

  const handleReset = () => {
    setSelectedTags([])
    setFilteredCourses(courses)
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-semibold mb-4'>Courses ({courses.length})</h1>
      <Filter
        tags={['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML']}
        selectedTags={selectedTags}
        onChange={setSelectedTags}
        onFilter={handleFilter}
        onReset={handleReset}
      />
      <div className='flex flex-wrap -mx-4'>
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}

export default CoursesList
