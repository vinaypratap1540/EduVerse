import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useCreateCourseMutation } from '../../../features/api/courseApi';

const AddCourse = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Select Category");
  const [createCourse,{data,error,isSuccess}]=useCreateCourseMutation()
  const [title,setTitle] = useState("");
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleCreate=async()=>{
    if (!title.trim()) {
      toast.error("Course title is required!");
      return;
    }
  
    if (selectedOption === "Select Category") {
      toast.error("Please select a valid category!");
      return;
    }
  
    const newCourse = { title };
    
    // Add category only if it's a valid selection
    if (selectedOption !== "Select Category") {
      newCourse.category = selectedOption;
    }
  
    await createCourse(newCourse);
  }
  useEffect(()=>{
    if(isSuccess){
      toast.success(data?.message || "Your course is successfully added")
      navigate(`/admin/course`)
    }
  },[isSuccess])
  return (
    <div style={{ marginLeft: "320px", display: "flex", flexDirection: "column", gap: "20px", width: '700px' }}>
      <h4>Let's add a new course, add some basic details for the new course</h4>

      {/* Title Input */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>Title</span>
        <input onChange={(e)=>setTitle(e.target.value)}
          type="text" placeholder='Your Course name'
          style={{
            border: "none", 
            borderBottom: "1px solid black", 
            outline: "none", 
            backgroundColor: "transparent"
          }} 
        />
      </div>
    
      {/* Category Dropdown */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>Category</span>
        <div style={{ position: 'relative', width: '250px' }}>
          <select
            value={selectedOption}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              backgroundColor: 'transparent',
              color: 'black',
              border: '2px solid black',
              borderRadius: '5px',
              appearance: 'none',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option disabled>Select Category</option>
            <option value="Web Development">Front End Devlopement</option>
            <option value="next js Development">Next.js Development</option>
            <option value="Data Science">Data Science</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Back End Development">Back End Developement</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="Docker">Docker</option>
            <option value="Javascript">Javascript</option>

          </select>
          {/* Custom Dropdown Arrow */}
          <span style={{
            position: 'absolute',
            top: '50%',
            right: '15px',
            transform: 'translateY(-50%)',
            color: 'black',
            pointerEvents: 'none'
          }}>▼</span>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px", marginTop: "20px" }}>
        <button onClick={()=>navigate(`/admin/course`)}
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
          Back
        </button>
        <button onClick={handleCreate}
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
          Create
        </button>
      </div>

    </div>
  );
};

export default AddCourse;


