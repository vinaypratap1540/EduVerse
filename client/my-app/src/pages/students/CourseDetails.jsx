import React from 'react'
import "./courseDetails.css"
import UpdateIcon from '@mui/icons-material/Update';
import { Card, CardContent } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import BuyCourseButton from './BuyCourseButton.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCourseDetailWithStatusQuery } from '../../features/api/purchaseApi.js';
const CourseDetails = () => {
  const params = useParams()
  const courseId = params.courseId;
  const navigate = useNavigate()
  const { data, isLoading, isSuccess, error, isError } = useGetCourseDetailWithStatusQuery(courseId)
  if (isLoading) return <h1>Loading...</h1>
  if (isError) return <h1>Failed to load course details</h1>
  const { course, purchased } = data;
  const handleContinueCourse=()=>{
   if(purchased)
   navigate(`/course-progress/${courseId}`)
  }
  return (
    <div>
      <div className='header'>
        <div className='content'>
          <h3>{course?.title}</h3>
          <h7>{course.subTitle}</h7>
          <span>Created By : {course?.creator.name}</span>
          <div style={{ display: "flex", gap: '8px' }}><UpdateIcon /> <span>Last updated {course.createdAt.split("T")[0]}</span></div>
          <span>Student Enrolled {course.enrolledStudent.length}</span>
        </div>
        <div style={{ display: 'flex' }}>
          <div>
            <div className='description'>
              <h4>Description</h4>
              <p dangerouslySetInnerHTML={{ __html: course.description }}></p>
            </div>
            <Card className='card'>
              <CardContent>
                <h4>Course Content</h4>
                <span>{course.lectures.length} Lectures</span>
              </CardContent>
              <CardContent style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {course.lectures.map((lecture, index) => (
                  <div style={{ display: "flex", gap: "5px" }} key={index}><PlayCircleOutlineIcon />{lecture.lectureTitle}</div>))
                }
              </CardContent>
            </Card>
          </div>

          <Card className='card1' style={{ marginLeft: "400px", marginTop: "180px" }}>

            <video
              src={course.lectures[0]?.videoUrl}
              controls={true}
              width="100%"
              height="180"
              style={{ borderRadius: "10px" }}
              crossOrigin="anonymous"
              playsInline
            />

            <div style={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <span>{course.lectures[0].lectureTitle}</span>
                <hr />
              </CardContent>
              <CardContent>
                <span>Course Price : {course.coursePrice}</span>
              </CardContent>
              {purchased ? <button onClick={handleContinueCourse}>Continue Course</button> : <BuyCourseButton courseId={courseId} />}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails
