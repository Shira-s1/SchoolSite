import React, { useState } from 'react'
import { booksByGrade } from '../../data/books'
import GradeSelector from './GradeSelector'
import BookTable from './BookTable'

export default function Bookstore(){
  const [grade, setGrade] = useState(null)
  const grades = Object.keys(booksByGrade)
  return (
    <div>
      <h1>School Bookstore</h1>
      <GradeSelector grades={grades} selected={grade} onChange={setGrade} />
      {grade ? <BookTable books={booksByGrade[grade]} grade={grade} /> : <p>Please select a grade to view textbooks.</p>}
    </div>
  )
}
