import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from '../../../features/api/courseApi.js';

const CourseTab = () => {
    const [isPublished, setIsPublished] = useState(true);
    const [editCourse, { data: editData, isSuccess, error,isLoading:editLoading }] = useEditCourseMutation();
    const { courseId } = useParams();
    const { data, error: fetchError, isLoading, refetch} = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedOption, setSelectedOption] = useState("Select Category");
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [publishCourse] = usePublishCourseMutation()
    useEffect(() => {
        if (data && data.course) {
            const course = data.course;
            setTitle(course.title);
            setSubTitle(course.subTitle);
            setDescription(course.description);
            setSelectedOption(course.category);
            setPrice(course.coursePrice);
        }
    }, [data]);
    const publishStatusHandler = async (action) => {
        try {
          const response = await publishCourse({courseId, query:action});
          if(response.data){
            refetch()
            toast.success(response.data.message);
          }
        } catch (error) {
          toast.error("Failed to publish or unpublish course");
        }
      }
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const selectThumbnail = (e) => {
        setFile(e.target.files?.[0]);
    };

    const saveFunctionality = async () => {
        if (selectedOption === "Select Category") {
            toast.error("Please select a valid category!");
            return;
        }
        
        const formData = new FormData();
        formData.append("title", title);
        formData.append("subTitle", subTitle);
        formData.append("description", description);
        formData.append("category", selectedOption);
        formData.append("coursePrice", price);
        if (file) formData.append("courseThumbnail", file);

        await editCourse({ formData, courseId });
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(editData?.message || "Course Updated Successfully!!!");
            navigate(`/admin/course`);
        }
        if (error) {
            toast.error(error.data?.message || "Unfortunately, the course was not updated");
        }
    }, [isSuccess, error]);

    if (isLoading) return <p>Loading course data...</p>;
    if (fetchError) return <p>Error loading course data!</p>;

    return (
        <div>
            <div className="card" style={{ width: "150vh", backgroundColor: 'transparent' }}>
                <div className="card-body">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <h6 style={{ width: "400px", display: "flex" }}>
                                <b>Basic Information</b>
                            </h6>
                            <p>Make changes to your course here. Click save when you're done.</p>
                        </div>
                        <div style={{ padding: "10px" }}>
                            <button disabled={data?.course?.lectures.length===0} className="btn btn-success" onClick={()=>publishStatusHandler(data.course.isPublished ? "false" : true)}>
                            {data.course.isPublished ? "Unpublish" : "Publish"}</button>
                            <button style={{ marginLeft: "10px" }} type="button" className="btn btn-outline-secondary">Remove Course</button>
                        </div>
                    </div>
                    <div style={{ marginTop: '30px' }}>
                        <h6>Title</h6>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "530px", backgroundColor: "transparent", border: 'none', borderBottom: "1px solid black", outline: "none" }} type="text" placeholder='Ex. FullStack Developer' />
                    </div>
                    <div style={{ marginTop: '30px' }}>
                        <h6>Subtitle</h6>
                        <input value={subTitle} onChange={(e) => setSubTitle(e.target.value)} style={{ width: "530px", backgroundColor: "transparent", border: 'none', borderBottom: "1px solid black", outline: "none" }} type="text" placeholder='Ex. Become a full-stack developer in 4 months' />
                    </div>
                    <div className='description' style={{ marginTop: '30px' }}>
                        <h6>Description</h6>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: "100vh", height: "150px", backgroundColor: "transparent" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", marginTop: "30px" }}>
                        <span>Category</span>
                        <select value={selectedOption} onChange={handleChange} style={{ width: '250px', padding: '10px', fontSize: '16px', border: '2px solid black', borderRadius: '5px', cursor: 'pointer', outline: 'none' }}> 
                         <option disabled>Select Category</option>
                         <option value="Web Development">Front End Development</option>
                         <option value="Next.js Development">Next.js Development</option>
                         <option value="Data Science">Data Science</option>
                         <option value="Machine Learning">Machine Learning</option>
                         <option value="Back End Development">Back End Development</option>
                         <option value="Cyber Security">Cyber Security</option>
                         <option value="Docker">Docker</option>
                         <option value="Javascript">Javascript</option>
    
                        </select>
                        <span style={{ marginTop: "30px" }}>Price</span>
                        <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" style={{ width: "180px", borderBottom: "1px solid black", backgroundColor: "transparent" }} />
                        <div style={{ marginTop: "30px" }}>
                            <label className="form-label">Choose Thumbnail</label>
                            <input onChange={selectThumbnail} style={{ width: '300px' }} className="form-control" type="file" />
                        </div>
                    </div>
                    <div style={{ display: "flex", marginTop: "40px", gap: '20px', justifyContent: "flex-end" }}>
                        <button onClick={() => navigate(`/admin/course`)} type="button" className="btn btn-light">Back</button>
                        <button onClick={saveFunctionality} type="button" disabled={isLoading} className="btn btn-success">{isLoading ? "Saving..." : "Save"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseTab;
