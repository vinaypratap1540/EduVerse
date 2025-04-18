import React from 'react'
import CourseTab from './CourseTab'
import { Link } from 'react-router-dom'

const EditCourse = () => {
  return (
    <div style={{ marginLeft: '320px'}}>
    <div style={{display:"flex",gap:"400px"}}>
      <div style={{display:"flex"}}>
      <h4 style={{width:"500px",display:"flex"}}>
        Add details information regarding course
      </h4>
      </div>
      <div style={{display:"flex"}}>
        <Link style={{textDecoration:'none'}} to="lecture">
      <button style={{display:"flex",justifyContent:"center",width:"270px"}} type="button" class="btn btn-outline-primary">Go to lectures pages</button>
      </Link>
      </div>
    </div>
    <CourseTab/>
    </div>
  )
}

export default EditCourse
