import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

type paramsType = {
  categoryID: string
  subcategoryID: string
}

const CoursesSearchByCategory: React.FC = () => {
  const { categoryID, subcategoryID } = useParams<paramsType>()
  useEffect(() => {
    if (!subcategoryID) {
      console.log('CoursesSearchByCategory')
      console.log(categoryID)
      return
    } else {
      console.log('CoursesSearchBySubCategory')
      console.log(subcategoryID)
    }
  })
  return <div>here we will search courses by category and subcategory</div>
}

export default CoursesSearchByCategory
