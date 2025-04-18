import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCreateCourseQuery } from '../../../features/api/courseApi.js';

const CourseTable = () => {
  const navigate = useNavigate();
  const { data } = useGetCreateCourseQuery();

  return (
      <div style={{ marginLeft: '320px', padding: '20px' }}>
          <button
              onClick={() => navigate(`/admin/course/create`)}
              type="button"
              className="btn btn-primary btn-lg"
              style={{ width: "300px", marginBottom: "20px" }}
          >
              Create New Course
          </button>
          <table className="table table-bordered" style={{ width: "150vh" }}>
              <thead className="table-dark">
                  <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Price</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                  </tr>
              </thead>
              <tbody>
                  {/* Add a conditional check before mapping */}
                  {data?.courses?.length > 0 ? (
                      data.courses.map((course, index) => (
                          <tr key={index}>
                              <td>{course.title}</td>
                              <td>{course?.coursePrice || "NA"}</td>
                              <td><span className="badge bg-success">{course?.isPublished ? "Published" : "Draft"}</span></td>
                              <td>
                                  <button onClick={()=>navigate(`/admin/course/${course._id}`)} className="btn btn-warning btn-sm" style={{ width: "60px" }}>Edit</button>
                              </td>
                          </tr>
                      ))
                  ) : (
                      <tr>
                          <td colSpan="4" className="text-center">No Courses Available</td>
                      </tr>
                  )}
              </tbody>
          </table>
      </div>
  );
};

export default CourseTable;
