import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import axios from "axios";
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useEditLectureMutation, useGetLectureByIdQuery } from '../../../features/api/courseApi.js';
import { useNavigate, useParams } from 'react-router-dom';
import { useRemoveLectureMutation} from '../../../features/api/courseApi.js';

const MEDIA_API = "http://localhost:8000/api/v1/media";
const LectureTab = () => {
  const [title,setTitle] = useState("")
  const [uploadVideoInfo,setUploadVideoInfo] = useState(null)
  const [isFree,setIsFree] = useState(false)
  const [mediaProgress,setMediaProgress] = useState(false)
  const [uploadProgress,setUploadProcess] = useState(0)
  const [btnDisable,setBtnDisable] = useState(true)
  const [editLecture,{data:lectureData,error:lectureError,isSuccess:lectureIsSuccess,isLoading:editLoading}] = useEditLectureMutation()
  const [removeLecture,{data:removeData, isLoading:removeLoading, isSuccess:removeSuccess}] = useRemoveLectureMutation()
  const params = useParams();
  const {courseId,lectureId} = params;
  const navigate = useNavigate()
  const {data:lectureIdData} = useGetLectureByIdQuery(lectureId)
  const lecture = lectureIdData?.lecture
  useEffect(()=>{
      if(lecture){
        setTitle(lecture.lectureTitle)
        setIsFree(lecture.isPreviewFree)
        setUploadVideoInfo(lecture.videoInfo)
      }
  },[lecture])
  const fileChangeHandler = async(e)=>{
    const file = e.target.files[0];
  if(file){
    const formData = new FormData();
    formData.append("file", file);

    setMediaProgress(true);

    try {
      const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
        onUploadProgress:({loaded,total})=>{
          const percentCompleted = Math.round((loaded * 100) / total);
          setUploadProcess(percentCompleted);
        }
      });

      if(res.data.success){
        setUploadVideoInfo({
          videoUrl: res.data.data.url,
          publicId: res.data.data.public_id
        });
        setBtnDisable(false);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Video upload failed");
    } finally {
      setMediaProgress(false);
      setUploadProcess(0);
    }
  }
  }
  const editLectureHandler = async()=>{
    if(uploadVideoInfo===null){
      return toast.error("Video is required")
    }
    await editLecture({lectureTitle:title,videoInfo:uploadVideoInfo,isPreviewFree:isFree,courseId,lectureId})
  }
  
  const removeLectureHandler=async()=>{
    await removeLecture(lectureId)
  }
  useEffect(() => {
    if (lectureIsSuccess) {
      toast.success(lectureData.message);
      navigate(`/admin/course/${courseId}/lecture`)
    }
    if (lectureError) {
      toast.error(lectureError.data.message);
    }
  }, [lectureIsSuccess, lectureError,lectureData]);
  useEffect(()=>{
    if(removeSuccess){
      toast.success(removeData.message);
      navigate(`/admin/course/${courseId}/lecture`)
    }
  },[removeSuccess])

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const handleFree=(e)=>{
    setIsFree(e.target.checked)
  }
  const label = { inputProps: { 'aria-label': 'Color switch demo' } };
  return (
       <div>
            <div className="card" style={{ width: "150vh", backgroundColor: 'transparent' }}>
                <div className="card-body">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <h6 style={{ width: "400px", display: "flex" }}>
                                <b>Edit Lecture</b>
                            </h6>
                            <p>Make changes in your lecture here. Click save when you're done.</p>
                        </div>
                        <div style={{ padding: "10px" }}>
                            <button style={{ marginLeft: "10px" }} type="button" className="btn btn-outline-danger" disabled={removeLoading} onClick={removeLectureHandler}>{removeLoading ? "Removing..." : "Remove Lecture"}</button>
                        </div>
                    </div>
                    <div style={{ marginTop: '30px' }}>
                        <h6>Title</h6>
                        <input value={title} onChange={(e)=>setTitle(e.target.value)} style={{ width: "530px", backgroundColor: "transparent", border: 'none', borderBottom: "1px solid black", outline: "none" }} type="text" placeholder='Ex. Introduction' />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", marginTop: "30px" }}>
                        <div style={{ marginTop: "30px" }}>
                            <label className="form-label">Choose Video <span style={{color:"red"}}>*</span></label>
                            <input style={{ width: '300px' }} onChange={fileChangeHandler} className="form-control" type="file" accept='video/*' />
                        </div>
                    </div>
                    {
                      mediaProgress && (
                        <div>
                          <Box sx={{ width: '100%' }}>
                            <LinearProgress variant="determinate" value={progress} />
                            <p style={{ textAlign: "center", marginTop: "5px" }}>
                              Uploading... {uploadProgress}%
                            </p>
                         </Box>
                        </div>
                      )
                    }
                    <div style={{marginTop:"30px"}}>
                    <Switch {...label} checked={isFree} onChange={handleFree} />
                    <span><b>Is this Video is free</b></span>
                    </div>
                    <div style={{ display: "flex", marginTop: "40px", justifyContent: "flex-end" }}>
                        <button type="button" className="btn btn-success" disabled={editLoading} onClick={editLectureHandler}>{editLoading ? "Updating..." : "Update Lecture"}</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default LectureTab
