import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import "./courseProgress.css";
import { useCompleteCourseMutation, useGetCourseProgressQuery, useInCompleteCourseMutation, useUpdateLectureProgressMutation } from '../../features/api/courseProgressApi';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;

  const [currentLecture, setCurrentLecture] = useState(null);
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);
  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [completeCourse, { data: markCompleteData, isSuccess: completedSuccess }] = useCompleteCourseMutation();
  const [inCompleteCourse, { data: markInCompleteData, isSuccess: inCompletedSuccess }] = useInCompleteCourseMutation();

  useEffect(() => {
    if (completedSuccess || inCompletedSuccess) {
      refetch();
      toast.success(markCompleteData?.message || markInCompleteData?.message);
    }
  }, [completedSuccess, inCompletedSuccess, markCompleteData, markInCompleteData, refetch]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load course details</p>;

  const { courseDetails, progress, completed } = data.data;
  const { title } = courseDetails;

  const initialLecture = currentLecture || (courseDetails.lectures?.length > 0 ? courseDetails.lectures[0] : null);
  
  const isLectureCompleted = (lectureId) => progress.some((prog) => prog.lectureId === lectureId && prog.viewed);

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleToggleCourseCompletion = async () => {
    if (completed) {
      await inCompleteCourse(courseId);
    } else {
      await completeCourse(courseId);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", marginTop: "15px", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ marginTop: "20px" }}>{title}</h2>
        <button
          style={{ height: "50px", width: "200px", marginRight: "50px", marginTop: "30px" }}
          onClick={handleToggleCourseCompletion}
          className={`btn ${completed ? "btn-secondary" : "btn-success"}`}
        >
          {completed ? "Completed" : "Mark as Completed"}
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: "space-evenly", marginTop: "50px" }}>
        <div>
          <Card className='cd1'>
            <video
              controls
              src={currentLecture?.videoUrl || initialLecture?.videoUrl || ""}
              width="100%"
              height="180"
              style={{ borderRadius: "10px" }}
              crossOrigin="anonymous"
              playsInline
              onPlay={() => handleLectureProgress(currentLecture?._id || initialLecture?._id)}
            />
            <CardContent>
              <span>
                {`Lecture ${
                  courseDetails.lectures.findIndex(
                    (lec) => lec._id === (currentLecture?._id || initialLecture?._id)
                  ) + 1
                }: ${currentLecture?.lectureTitle || initialLecture?.lectureTitle}`}
              </span>
            </CardContent>
          </Card>
        </div>
        <div style={{ borderLeft: "3px solid grey" }}></div>
        <div>
          <Card className='cd2'>
            <CardContent><span>Course Lectures</span></CardContent>
            {courseDetails?.lectures.map((lecture) => (
              <CardContent onClick={() => handleSelectLecture(lecture)} key={lecture._id} style={{ cursor: "pointer" }}>
                {isLectureCompleted(lecture._id) ? <CheckCircleOutlineIcon /> : <PlayCircleOutlineIcon />}
                {lecture.lectureTitle}
                {isLectureCompleted(lecture._id) && (<button disabled={true} style={{ color: "green", marginLeft: "10px" }}>Completed</button>)}
              </CardContent>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;

