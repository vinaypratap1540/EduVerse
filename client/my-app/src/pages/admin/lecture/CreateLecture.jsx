import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCreateLectureMutation, useGetCourseLectureQuery } from '../../../features/api/courseApi';
import { toast } from 'react-toastify';
import Lecture from './Lecture.jsx';

const CreateLecture = () => {
    const navigate = useNavigate()
    const [lectureTitle,setLectureTitle] = useState("")
    const params = useParams();
    const courseId = params.courseId
    const [createLecture,{data,isSuccess,isLoading,error}] =useCreateLectureMutation()
    const {data:lectureData,isLoading:lectureIsLoading,isError:lectureIsError,refetch} = useGetCourseLectureQuery(courseId)
    const createLectureHandler=async()=>{
     await createLecture({lectureTitle,courseId})
    }
    useEffect(()=>{
       if(isSuccess){
        refetch()
        toast.success(data.message || "Lecture is created successfully")
       }
       if(error){
        toast.error(error.data.message || "Something error in creating lecture")
       }
    },[data,isSuccess,error])
  return (
    <div style={{ marginLeft: "320px", display: "flex", flexDirection: "column", gap: "20px", width: '700px' }}>
      <h4 style={{width:"100vh"}}>Let's add a new Lecture, add some basic details for the new lecture</h4>

      {/* Title Input */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>Title <span style={{color:"red"}}>*</span></span>
        <input
          value={lectureTitle}
          onChange={(e)=>setLectureTitle(e.target.value)}
          type="text" placeholder='Your Lecture title name'
          style={{
            border: "none", 
            borderBottom: "1px solid black", 
            outline: "none", 
            backgroundColor: "transparent"
          }} 
        />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px", marginTop: "20px" }}>
        <button onClick={()=>navigate(`/admin/course/${courseId}`)}
          style={{
            padding: "10px 20px",
            backgroundColor: "gray",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Back to Course
        </button>
        <button onClick={createLectureHandler} disabled={isLoading}
          style={{
            padding: "10px 20px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          {isLoading ? "Lecture is creating...":"Create Lecture"}
        </button>
      </div>
       <div style={{marginTop:"30px"}}>
          {
            lectureIsLoading ? <p>Loading Lecture...</p> : lectureIsError ? <p>Failed to load lecture</p> : 
            lectureData.lectures.length===0 ? <p>No lecture available</p> : 
            (lectureData.lectures.map((lecture,index)=>(
              <Lecture key={lecture._id} lecture={lecture} courseId={courseId} index={index}/>
            )))
          }
       </div>
    </div>
  )
}

export default CreateLecture
