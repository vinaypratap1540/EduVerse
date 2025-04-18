import React from 'react'
import "./mylearning.css"
import Course from './Course.jsx'
import { useLoadUserQuery } from '../../features/api/authApi.js'
const MyLearning = () => {
  const {data,isLoading} = useLoadUserQuery()
  const myLearning = data?.user.enrolledCourse || []
  return (
    <div style={{marginTop:"30px"}}>
      <h2>My Learning</h2>
      {myLearning.length === 0 ? <p> You are not enrolled in any course yet </p> : 
      <div style={{display:"flex",flexWrap:"wrap"}}>
      {myLearning.map((course,index)=><Course key={index} course={course}/>)}
      </div>
      }
    </div>
  )
}

export default MyLearning
