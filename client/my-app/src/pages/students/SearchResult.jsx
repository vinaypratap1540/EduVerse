import React from 'react'
import { Link } from 'react-router-dom'

const SearchResult = ({course}) => {
  return (
    <Link to={`/course-details/${course._id}`} style={{textDecoration:"none",color:"black"}}>
    <div style={{display:"flex"}}>
      <div>
        <img style={{height:"150px"}} src={course.courseThumbnail} alt="" />
        <hr/>
      </div>
      <div style={{display:"flex",flexDirection:"column",justifyContent:"center",gap:"10px",marginLeft:"10px"}}>
         <h3>{course.title}</h3>
         <h8>{course.subTitle}</h8>
         <h8>Instructor : <b><i>{course.creator?.name}</i></b></h8>
         <h8>Course Price : <b>₹{course.coursePrice}</b></h8>
      </div>
    </div>
    </Link>
  )
}

export default SearchResult
