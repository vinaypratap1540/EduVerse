import React from "react";
import { useParams, Link } from "react-router-dom";
import LectureTab from "./LectureTab.jsx";
import { Button, IconButton, Typography, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditLecture = () => {
  const params = useParams();
  const courseId = params.courseId;

  return (
    <div style={{ marginLeft: "320px", display: "flex", flexDirection: "column", gap: "20px", width: '700px' }}>
    <Box sx={{ maxWidth: '100%'}}>
      <Box 
        display="flex" 
        alignItems="center" 
        justifyContent="space-between" 
        mb={3}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Link to={`/admin/course/${courseId}/lecture`}>
            <IconButton color="primary" size="small">
              <ArrowBackIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" fontWeight="bold">
            Update Your Lecture
          </Typography>
        </Box>
      </Box>
      <LectureTab />
    </Box>
    </div>
  );
};

export default EditLecture;

