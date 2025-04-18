import React from "react";
import Course from "./Course.jsx";
import { useGetPublishedCourseQuery } from "../../features/api/courseApi.js";


const Courses = () => {
  const {data,isLoading,isError} = useGetPublishedCourseQuery()
  console.log(data);
  if(isError){ <h1>Some error occurred while fetching the courses</h1>}

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
        <h2>Our Courses</h2>
      </div>
      
      <div style={{ display:"flex",flexWrap:"wrap"}}>
        {data?.courses && data.courses.map((course,index) => (
          <Course key={index} course={course} />
        ))}
      </div>
    </div>
  );
};
export default Courses;

