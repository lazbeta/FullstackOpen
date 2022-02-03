import React from 'react'

const Course = ({course}) => {
  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Content = ({course}) => {
  return (
    <div>
    {course.parts.map(part => 
      <Part key={part.id} part={part}/>)}
    </div>
  )
}

const Total = ({course}) => {
return (
  <div>
    <p>
    <b>Total of {course.parts.reduce((sum, part) => 
  sum + part.exercises,0)} excercises.</b>
  </p>
   </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

export default Course
